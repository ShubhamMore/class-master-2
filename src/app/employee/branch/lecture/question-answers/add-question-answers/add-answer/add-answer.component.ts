import { LectureService } from '../../../../../../services/lecture.service';
import { BranchService } from '../../../../../../services/branch.service';
import { QuestionAnswersService } from '../../../../../../services/question-answers.service';
import { LectureQuestionModel } from '../../../../../../models/lecture-question.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LectureQuestionAnswerModel } from '../../../../../../models/lecture-question-answers.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScheduleModel as LectureModel } from '../../../../../../models/schedule.model';

@Component({
  selector: 'ngx-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss'],
})
export class AddAnswerComponent implements OnInit, OnDestroy {
  loading: boolean;
  answerForm: FormGroup;

  branchId: string;
  lecture: LectureModel;
  lectureQuestionAnswer: LectureQuestionAnswerModel;
  lectureQuestion: LectureQuestionModel;

  constructor(
    private toastrService: NbToastrService,
    private branchService: BranchService,
    private lectureService: LectureService,
    private questionAnswersService: QuestionAnswersService,
    protected ref: NbDialogRef<AddAnswerComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.onClose();
      return;
    }

    this.answerForm = new FormGroup({
      answer: new FormControl(
        this.lectureQuestionAnswer ? this.lectureQuestionAnswer.answer : null,
        {
          validators: [Validators.required],
        },
      ),
    });

    this.questionAnswersService.getQuestion().subscribe((questionAnswers: LectureQuestionModel) => {
      this.lectureQuestion = questionAnswers;
    });

    this.questionAnswersService
      .getQuestionAnswer()
      .subscribe((questionAnswer: LectureQuestionAnswerModel) => {
        this.lectureQuestionAnswer = questionAnswer;
        if (questionAnswer) {
          this.answerForm.patchValue({ answer: this.lectureQuestionAnswer.answer });
        }
      });

    this.lectureService.getLectureData().subscribe((lecture: LectureModel) => {
      this.lecture = lecture;
      if (!this.lecture) {
        this.onClose();
        return;
      }
      this.loading = false;
    });
  }

  onClose() {
    this.ref.close();
  }

  saveLectureQuestionAnswer() {
    this.answerForm.markAllAsTouched();
    if (this.answerForm.invalid) {
      this.showToastr('top-right', 'danger', 'Answer is Required');
      return;
    }

    const answer: string = this.answerForm.value.answer;

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
          this.showToastr('top-right', 'success', 'New Answer Added Successfully!');
          this.ref.close(newLectureQuestionAnswer);
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
          this.lectureQuestionAnswer.answer = answer;
          this.showToastr('top-right', 'success', 'Answer Updated Successfully!');
          this.ref.close(this.lectureQuestionAnswer);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.questionAnswersService.deleteQuestionAnswerId();
    this.questionAnswersService.deleteQuestionAnswer();
  }
}
