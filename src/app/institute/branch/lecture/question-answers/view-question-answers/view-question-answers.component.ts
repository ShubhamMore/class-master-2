import { QuestionAnswersService } from './../../../../../services/question-answers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LectureService } from './../../../../../services/lecture.service';
import { BranchService } from './../../../../../services/branch.service';
import { LectureQuestionModel } from '../../../../../models/lecture-question.model';
import { NbToastrService } from '@nebular/theme';
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
  lectureQuestionAnswers: LectureQuestionAnswerModel[];
  answerModel: boolean;
  branchId: string;
  lecture: LectureModel;

  constructor(
    private toastrService: NbToastrService,
    private branchService: BranchService,
    private lectureService: LectureService,
    private questionAnswersService: QuestionAnswersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.questionAnswersService
      .getQuestionAnswersData()
      .subscribe((questionAnswers: LectureQuestionModel) => {
        this.lectureQuestion = questionAnswers;
      });

    this.answerModel = false;
    this.lectureQuestionAnswers = [];

    this.lectureService.getLectureData().subscribe((lecture: LectureModel) => {
      this.lecture = lecture;
      if (!this.lecture) {
        this.back();
        return;
      }
    });
  }

  addQuestionAnswer() {
    this.answerModel = true;
  }

  editQuestionAnswer(lectureQuestionAnswer: LectureQuestionAnswerModel) {
    if (lectureQuestionAnswer) {
      this.lectureQuestionAnswer = lectureQuestionAnswer;
      this.answerModel = true;
    } else {
      this.showToastr('top-right', 'danger', 'Cant Edit this Answer');
    }
  }

  closeAnswerModel() {
    this.answerModel = false;
    this.lectureQuestionAnswer = null;
  }

  saveLectureQuestion(answer: any) {
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
        (res: any) => {
          this.closeAnswerModel();
          this.showToastr('top-right', 'success', 'New Answer Added Successfully!');
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      lectureQuestionAnswer._id = this.lectureQuestionAnswer._id;
      this.questionAnswersService.editLectureQuestionAnswer(lectureQuestionAnswer).subscribe(
        (res: any) => {
          this.closeAnswerModel();
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
