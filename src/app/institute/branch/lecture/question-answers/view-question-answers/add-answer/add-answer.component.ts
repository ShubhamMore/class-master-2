import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LectureQuestionAnswerModel } from './../../../../../../models/lecture-question-answers.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ngx-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss'],
})
export class AddAnswerComponent implements OnInit {
  loading: boolean;
  answerForm: FormGroup;

  @Input() answer: LectureQuestionAnswerModel;

  @Output() close = new EventEmitter<void>();
  @Output() submitAnswer = new EventEmitter<string>();

  constructor(private toastrService: NbToastrService) {}

  ngOnInit(): void {
    this.loading = true;

    this.answerForm = new FormGroup({
      answer: new FormControl(this.answer ? this.answer.answer : null, {
        validators: [Validators.required],
      }),
    });

    this.loading = false;
  }

  onClose() {
    this.close.emit();
  }

  saveAnswer() {
    this.answerForm.markAllAsTouched();
    if (this.answerForm.invalid) {
      this.showToastr('top-right', 'danger', 'Answer is Required');
      return;
    }

    const answer: string = this.answerForm.value.answer;

    this.submitAnswer.emit(answer);
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
