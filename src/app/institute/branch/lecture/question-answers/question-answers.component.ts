import { AddQuestionComponent } from './add-question-answers/add-question/add-question.component';
import { DateService } from './../../../../services/shared-services/date.service';
import { AuthService } from './../../../../authentication/auth/auth-service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LectureQuestionModel } from '../../../../models/lecture-question.model';
import { Component, OnInit } from '@angular/core';
import { ScheduleModel as LectureModel } from './../../../../models/schedule.model';
import { LectureService } from './../../../../services/lecture.service';
import { QuestionAnswersService } from './../../../../services/question-answers.service';
import { BranchService } from './../../../../services/branch.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss'],
})
export class QuestionAnswersComponent implements OnInit {
  loading: boolean;
  branchId: string;
  lecture: LectureModel;
  questionsAnswers: LectureQuestionModel[];
  editLectureQuestion: boolean;
  user: { name: string; imsMasterId: string };

  constructor(
    private authService: AuthService,
    private branchService: BranchService,
    private lectureService: LectureService,
    private questionAnswerService: QuestionAnswersService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    public dateService: DateService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.editLectureQuestion = false;

    this.user = this.authService.getUserData();

    this.questionsAnswers = [];

    this.lectureService.getLectureData().subscribe((lecture: LectureModel) => {
      this.lecture = lecture;
      if (!this.lecture) {
        this.router.navigate(['../'], { relativeTo: this.route });
        return;
      }
      this.getQuestionAnswers();
    });
  }

  getQuestionAnswers() {
    this.loading = true;
    this.questionAnswerService
      .getLectureQuestionAnswers(
        this.branchId,
        this.lecture.category,
        this.lecture.course,
        this.lecture.batch,
        this.lecture._id,
      )
      .subscribe(
        (questionsAnswers: LectureQuestionModel[]) => {
          this.questionsAnswers = questionsAnswers;
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
        },
      );
  }

  addQuestion() {
    this.openQuestionDialog();
  }

  openQuestionDialog() {
    this.dialogService
      .open(AddQuestionComponent, {
        context: {},
      })
      .onClose.subscribe(
        (question: LectureQuestionModel) => question && this.saveLectureQuestion(question),
      );
  }

  editQuestion(questionAnswer: LectureQuestionModel) {
    this.questionAnswerService.setQuestionId(questionAnswer._id);
    this.questionAnswerService.setQuestion(questionAnswer);
    this.editLectureQuestion = true;
    this.openQuestionDialog();
  }

  formatQuestionAnswerDate(questionDate: any) {
    const date: string = this.dateService.convertToDate(questionDate).toString();
    return date.substr(0, 21);
  }

  deleteQuestion(id: string, i: number) {
    this.loading = true;
    this.questionAnswerService.deleteLectureQuestion(id).subscribe(
      (res: any) => {
        this.questionsAnswers.splice(i, 1);
        this.showToastr('top-right', 'success', `Question Deleted Successfully!`);
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  viewQuestionAnswer(questionAnswer: LectureQuestionModel) {
    this.questionAnswerService.setQuestionAnswersId(questionAnswer._id);
    this.questionAnswerService.setQuestionAnswers(questionAnswer);
    this.router.navigate(['./view'], { relativeTo: this.route });
  }

  saveLectureQuestion(question: LectureQuestionModel) {
    if (!this.editLectureQuestion) {
      question.name = this.user.name;
      this.questionsAnswers.push(question);
    } else {
      const index = this.questionsAnswers.findIndex(
        (curQuestion: LectureQuestionModel) => curQuestion._id === question._id,
      );

      if (index >= 0) {
        this.questionsAnswers[index] = question;
      }

      this.editLectureQuestion = false;
    }
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
