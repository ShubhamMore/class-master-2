import { QuestionAnswersService } from './../../../../../../services/question-answers.service';
import { LectureQuestionModel } from './../../../../../../models/lecture-question.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LectureQuestionAnswerModel } from './../../../../../../models/lecture-question-answers.model';
import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModel as LectureModel } from './../../../../../../models/schedule.model';

@Component({
  selector: 'ngx-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss'],
})
export class AddAnswerComponent implements OnInit {
  loading: boolean;
  answerForm: FormGroup;

  @Input() branchId: string;
  @Input() lecture: LectureModel;
  @Input() lectureQuestionAnswer: LectureQuestionAnswerModel;
  @Input() lectureQuestion: LectureQuestionModel;

  constructor(
    private toastrService: NbToastrService,
    private questionAnswersService: QuestionAnswersService,
    protected ref: NbDialogRef<AddAnswerComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.answerForm = new FormGroup({
      answer: new FormControl(
        this.lectureQuestionAnswer ? this.lectureQuestionAnswer.answer : null,
        {
          validators: [Validators.required],
        },
      ),
    });

    this.loading = false;
  }

  onClose() {
    this.ref.close();
  }

  saveLectureQuestionAnswer() {
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
}
