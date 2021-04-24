import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { DateService } from './../../../../../../services/shared-services/date.service';
import { OnlineExamQuestionService } from './../../../../../../services/online-exam-question.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnlineExamService } from './../../../../../../services/online-exam.service';
import { OnlineExamModel } from '../../../../../../models/online-exam.model';
import { OnlineExamQuestionModel } from '../../../../../../models/online-exam-question.model';
import { BranchService } from './../../../../../../services/branch.service';

@Component({
  selector: 'ngx-add-online-test-questions',
  templateUrl: './add-online-test-questions.component.html',
  styleUrls: ['./add-online-test-questions.component.scss'],
})
export class AddOnlineTestQuestionsComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  branchId: string;
  onlineExam: OnlineExamModel;
  onlineExamQuestion: OnlineExamQuestionModel;
  onlineExamQuestionId: string;
  onlineExamQuestionForm: FormGroup;

  constructor(
    private branchService: BranchService,
    private onlineExamQuestionService: OnlineExamQuestionService,
    private onlineExamService: OnlineExamService,
    public dateService: DateService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.onlineExamService.getOnlineExamData().subscribe((onlineExam: OnlineExamModel) => {
      if (!onlineExam) {
        this.back();
        return;
      }

      this.onlineExam = onlineExam;

      let mode: string;

      this.route.data.subscribe((data: any) => {
        mode = data.mode;
      });

      this.onlineExamQuestionId = this.onlineExamQuestionService.getOnlineExamQuestionId();

      if (mode && mode !== 'edit') {
        this.showToastr('top-right', 'danger', 'Invalid Route');
        return;
      } else if (mode && !this.onlineExamQuestionId) {
        this.showToastr('top-right', 'danger', 'Online Exam Question Not Found');
        return;
      }

      this.onlineExamQuestionForm = new FormGroup(
        {
          question: new FormControl(null, { validators: [Validators.required] }),
          answers: new FormArray([]),
          marks: new FormControl(this.onlineExam.eachQuestionMarks, {
            validators: [Validators.required],
          }),
        },
        { validators: this.atLeastOneCorrectAnswerValidator.bind(this) },
      );

      if (mode && this.onlineExamQuestionId) {
        this.onlineExamQuestionService.getOnlineExamQuestion(this.onlineExamQuestionId).subscribe(
          (question: OnlineExamQuestionModel) => {
            this.onlineExamQuestion = question;

            this.onlineExamQuestionForm.patchValue({
              question: this.onlineExamQuestion.question,
              marks: this.onlineExamQuestion.marks,
            });

            const answers = this.onlineExamQuestionForm.get('answers') as FormArray;
            answers.controls = [];
            this.onlineExamQuestion.answers.forEach((answer) => {
              this.addOption(answer);
            });
            this.loading = false;
          },
          (err: any) => {
            this.showToastr('top-right', 'danger', err);
            this.back();
            this.loading = false;
          },
        );
      } else {
        this.generateOption();
        this.generateOption();
        this.loading = false;
      }
    });
  }

  atLeastOneCorrectAnswerValidator(group: FormGroup): { [s: string]: boolean } {
    const answers = group.value.answers;
    let isCorrect = false;
    answers.forEach((answer: any) => {
      if (answer.isCorrect) {
        isCorrect = true;
      }
    });

    if (!isCorrect) {
      return { atLeastOneCorrectAnswerError: true };
    }
    return null;
  }

  newAnswer(answerData: any) {
    return new FormGroup({
      answer: new FormControl(answerData.answer ? answerData.answer : null, {
        validators: [Validators.required],
      }),
      isCorrect: new FormControl(answerData.isCorrect, {
        validators: [],
      }),
    });
  }

  addOption(answer: any) {
    const answers = this.onlineExamQuestionForm.get('answers') as FormArray;
    answers.push(this.newAnswer(answer));
  }

  generateOption() {
    const answer = {
      answer: '',
      isCorrect: false,
    };
    this.addOption(answer);
  }

  deleteOption(i: number) {
    if (i !== 0 && i !== 1) {
      const answers = this.onlineExamQuestionForm.get('answers') as FormArray;
      answers.removeAt(i);
    }
  }

  previousStep() {
    this.stepper.previous();
  }

  submitOnlineExamQuestionForm() {
    this.onlineExamQuestionForm.markAllAsTouched();
    if (this.onlineExamQuestionForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Online Exam Question are Required');
      return;
    }

    this.stepper.next();
  }

  saveOnlineExamQuestion() {
    this.onlineExamQuestionForm.markAllAsTouched();
    if (this.onlineExamQuestionForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Online Exam Question Fields are Required');
      return;
    }

    this.submit = true;

    const onlineExamQuestion: any = this.onlineExamQuestionForm.value;
    onlineExamQuestion.onlineExam = this.onlineExam._id;

    if (!this.onlineExamQuestion) {
      this.onlineExamQuestionService.newOnlineExamQuestion(onlineExamQuestion).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Question Added Successfully');
          this.back();
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.submit = false;
        },
      );
    } else {
      onlineExamQuestion._id = this.onlineExamQuestion._id;
      this.onlineExamQuestionService.editOnlineExamQuestion(onlineExamQuestion).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Question Added Successfully');
          this.back();
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.submit = false;
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

  back() {
    this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true });
  }

  ngOnDestroy() {
    this.onlineExamQuestionService.deleteOnlineExamQuestionId();
    this.onlineExamQuestionService.deleteOnlineExamQuestionData();
  }
}
