import { AddAnswerComponent } from './add-answer/add-answer.component';
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
  lectureQuestionAnswer: LectureQuestionAnswerModel;
  branchId: string;
  lecture: LectureModel;
  userId: string;

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

    this.userId = this.authService.getUserData().imsMasterId;

    this.questionAnswersService
      .getQuestionAnswersData()
      .subscribe((questionAnswers: LectureQuestionModel) => {
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

  addQuestionAnswer() {
    this.openAnswerDialog();
  }

  private openAnswerDialog() {
    this.dialogService
      .open(AddAnswerComponent, {
        context: {
          answer: this.lectureQuestionAnswer,
        },
      })
      .onClose.subscribe((answer: string) => answer && this.saveLectureQuestionAnswer(answer));
  }

  editQuestion(questionAnswer: LectureQuestionModel) {}

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
      this.lectureQuestionAnswer = lectureQuestionAnswer;
      this.openAnswerDialog();
    } else {
      // tslint:disable-next-line: quotemark
      this.showToastr('top-right', 'danger', "Can't Edit this Answer");
    }
  }

  saveLectureQuestionAnswer(answer: string) {
    const lectureQuestionAnswer: any = {
      branch: this.branchId,
      category: this.lecture.category,
      course: this.lecture.course,
      batch: this.lecture.batch,
      lecture: this.lecture._id,
      question: this.lectureQuestion._id,
      answer: answer,
    };

    if (!this.lectureQuestionAnswer) {
      this.questionAnswersService.newLectureQuestionAnswer(lectureQuestionAnswer).subscribe(
        (newLectureQuestionAnswer: LectureQuestionAnswerModel) => {
          this.lectureQuestion.answers.push(newLectureQuestionAnswer);
          this.showToastr('top-right', 'success', 'New Answer Added Successfully!');
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      lectureQuestionAnswer._id = this.lectureQuestionAnswer._id;
      const index = this.lectureQuestion.answers.findIndex(
        (curAnswer: LectureQuestionAnswerModel) => curAnswer._id === this.lectureQuestionAnswer._id,
      );

      this.questionAnswersService.editLectureQuestionAnswer(lectureQuestionAnswer).subscribe(
        (res: any) => {
          if (index >= 0) {
            this.lectureQuestion.answers[index].answer = answer;
          }
          this.lectureQuestionAnswer = null;
          this.showToastr('top-right', 'success', 'Answer Updated Successfully!');
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
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
    this.questionAnswersService.deleteQuestionAnswersData();
  }
}
