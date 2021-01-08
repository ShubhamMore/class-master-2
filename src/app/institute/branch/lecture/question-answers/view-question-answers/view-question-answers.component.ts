import { AddQuestionComponent } from './../add-question-answers/add-question/add-question.component';
import { AddAnswerComponent } from '../add-question-answers/add-answer/add-answer.component';
import { DateService } from './../../../../../services/shared-services/date.service';
import { AuthService } from './../../../../../authentication/auth/auth-service/auth.service';
import { QuestionAnswersService } from './../../../../../services/question-answers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LectureService } from './../../../../../services/lecture.service';
import { BranchService } from './../../../../../services/branch.service';
import { LectureQuestionModel } from '../../../../../models/lecture-question.model';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { ScheduleModel as LectureModel } from './../../../../../models/schedule.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LectureQuestionAnswerModel } from '../../../../../models/lecture-question-answers.model';

@Component({
  selector: 'ngx-view-question-answers',
  templateUrl: './view-question-answers.component.html',
  styleUrls: ['./view-question-answers.component.scss'],
})
export class ViewQuestionAnswersComponent implements OnInit, OnDestroy {
  loading: boolean;
  lectureQuestion: LectureQuestionModel;
  branchId: string;
  lecture: LectureModel;
  editLectureQuestionAnswer: boolean;
  user: { name: string; imsMasterId: string };

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    private branchService: BranchService,
    private lectureService: LectureService,
    private questionAnswersService: QuestionAnswersService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.editLectureQuestionAnswer = false;

    this.user = this.authService.getUserData();

    this.questionAnswersService
      .getQuestionAnswers()
      .subscribe((questionAnswers: LectureQuestionModel) => {
        if (!questionAnswers) {
        }
        this.lectureQuestion = questionAnswers;
      });

    this.lectureService.getLectureData().subscribe((lecture: LectureModel) => {
      this.lecture = lecture;
      if (!this.lecture) {
        this.back();
        return;
      }
    });

    this.getLectureQuestionAnswers(this.lectureQuestion._id);

    if (!this.lectureQuestion) {
    } else {
      const id = this.questionAnswersService.getQuestionAnswersId();
      if (id) {
        this.getLectureQuestionAnswers(id);
      } else {
        this.showToastr('top-right', 'danger', 'Question Not Found');
        this.back();
      }
    }
  }

  getLectureQuestionAnswers(id: string) {
    this.questionAnswersService.getLectureQuestionAnswer(id).subscribe(
      (questionAnswer: LectureQuestionModel) => {
        this.lectureQuestion = questionAnswer;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.back();
      },
    );
  }

  addQuestionAnswer(lectureQuestion: LectureQuestionModel) {
    this.questionAnswersService.setQuestionId(lectureQuestion._id);
    this.questionAnswersService.setQuestion(lectureQuestion);
    this.openAnswerDialog();
  }

  private openAnswerDialog() {
    this.dialogService
      .open(AddAnswerComponent, {
        context: {},
      })
      .onClose.subscribe(
        (answer: LectureQuestionAnswerModel) => answer && this.saveLectureQuestionAnswer(answer),
      );
  }

  editQuestion(lectureQuestion: LectureQuestionModel) {
    this.questionAnswersService.setQuestionId(lectureQuestion._id);
    this.questionAnswersService.setQuestion(lectureQuestion);
    this.dialogService
      .open(AddQuestionComponent, {
        context: {},
      })
      .onClose.subscribe((question: LectureQuestionModel) => {
        if (question) {
          this.lectureQuestion = question;
        }
      });
  }

  formatQuestionAnswerDate(questionDate: any) {
    const date: string = this.dateService.convertToDate(questionDate).toString();
    return date.substr(0, 21);
  }

  deleteQuestion(id: string) {
    this.loading = true;
    this.questionAnswersService.deleteLectureQuestion(id).subscribe(
      (res: any) => {
        this.back();
        this.showToastr('top-right', 'success', `Question Deleted Successfully!`);
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  deleteQuestionAnswer(id: string, i: number) {
    this.questionAnswersService.deleteLectureQuestionAnswer(id).subscribe(
      (res: any) => {
        this.lectureQuestion.answers.splice(i, 1);
        this.showToastr('top-right', 'success', `Answer Deleted Successfully!`);
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
      },
    );
  }

  editQuestionAnswer(lectureQuestionAnswer: LectureQuestionAnswerModel) {
    if (lectureQuestionAnswer) {
      this.questionAnswersService.setQuestionAnswerId(lectureQuestionAnswer._id);
      this.questionAnswersService.setQuestionAnswer(lectureQuestionAnswer);
      this.editLectureQuestionAnswer = true;
      this.openAnswerDialog();
    } else {
      // tslint:disable-next-line: quotemark
      this.showToastr('top-right', 'danger', "Can't Edit this Answer");
    }
  }

  saveLectureQuestionAnswer(newLectureQuestionAnswer: LectureQuestionAnswerModel) {
    if (!this.editLectureQuestionAnswer) {
      newLectureQuestionAnswer.name = this.user.name;
      this.lectureQuestion.answers.push(newLectureQuestionAnswer);
    } else {
      const index = this.lectureQuestion.answers.findIndex(
        (curAnswer: LectureQuestionAnswerModel) => curAnswer._id === newLectureQuestionAnswer._id,
      );

      if (index >= 0) {
        this.lectureQuestion.answers[index] = newLectureQuestionAnswer;
      }
      this.editLectureQuestionAnswer = false;
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.questionAnswersService.deleteQuestionAnswersId();
    this.questionAnswersService.deleteQuestionAnswers();
  }
}
