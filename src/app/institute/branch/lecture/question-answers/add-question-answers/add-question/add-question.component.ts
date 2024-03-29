import { QuestionAnswersService } from './../../../../../../services/question-answers.service';
import { LectureService } from './../../../../../../services/lecture.service';
import { BranchService } from './../../../../../../services/branch.service';
import { LectureQuestionModel } from '../../../../../../models/lecture-question.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { ScheduleModel as LectureModel } from '../../../../../../models/schedule.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  loading: boolean;
  submit: boolean;

  lectureQuestion: LectureQuestionModel;
  branchId: string;
  lecture: LectureModel;
  lectureQuestionForm: FormGroup;

  constructor(
    private toastrService: NbToastrService,
    private branchService: BranchService,
    private lectureService: LectureService,
    private questionAnswersService: QuestionAnswersService,
    protected ref: NbDialogRef<AddQuestionComponent>, // private router: Router, // private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.onClose();
      return;
    }

    this.lectureQuestionForm = new FormGroup({
      question: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.questionAnswersService.getQuestion().subscribe((questionAnswers: LectureQuestionModel) => {
      this.lectureQuestion = questionAnswers;
      if (questionAnswers) {
        this.lectureQuestionForm.patchValue({ question: this.lectureQuestion.question });
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

  saveLectureQuestion() {
    this.lectureQuestionForm.markAllAsTouched();
    if (this.lectureQuestionForm.invalid) {
      this.showToastr('top-right', 'danger', 'Question is Required');
      return;
    }
    this.submit = true;

    const question: string = this.lectureQuestionForm.value.question;

    const lectureQuestion: any = {
      branch: this.branchId,
      category: this.lecture.category,
      course: this.lecture.course,
      batch: this.lecture.batch,
      lecture: this.lecture._id,
      question: question,
    };

    if (!this.lectureQuestion) {
      this.questionAnswersService.newLectureQuestion(lectureQuestion).subscribe(
        (newLectureQuestion: LectureQuestionModel) => {
          this.showToastr('top-right', 'success', 'New Question Added Successfully!');
          this.ref.close(newLectureQuestion);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      lectureQuestion._id = this.lectureQuestion._id;
      this.questionAnswersService.editLectureQuestion(lectureQuestion).subscribe(
        (res: any) => {
          this.lectureQuestion.question = question;
          this.showToastr('top-right', 'success', 'Question Updated Successfully!');
          this.ref.close(this.lectureQuestion);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
  }

  onClose() {
    this.ref.close();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.questionAnswersService.deleteQuestionId();
    this.questionAnswersService.deleteQuestion();
  }
}
