import { Router, ActivatedRoute, Params } from '@angular/router';
import { DateService } from './../../../../../services/shared-services/date.service';
import { BranchService } from './../../../../../services/branch.service';
import { OnlineExamService } from './../../../../../services/online-exam.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { BatchService } from './../../../../../services/batch.service';
import { CourseService } from './../../../../../services/course.service';
import { BatchModel } from './../../../../../models/batch.model';
import { CourseModel, SubjectModel } from './../../../../../models/course.model';
import { CategoryModel } from './../../../../../models/branch.model';
import { OnlineExamModel } from './../../../../../models/online-exam.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-add-online-test',
  templateUrl: './add-online-test.component.html',
  styleUrls: ['./add-online-test.component.scss'],
})
export class AddOnlineTestComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;

  submit: boolean;

  branchId: string;
  category: CategoryModel;
  course: CourseModel;
  batch: BatchModel;
  onlineExamForm: FormGroup;
  onlineExamId: string;
  onlineExam: OnlineExamModel;
  subjects: SubjectModel[];

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    public dateService: DateService,
    private batchService: BatchService,
    private onlineExamService: OnlineExamService,
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

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    this.onlineExamId = this.onlineExamService.getOnlineExamId();

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      // this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.onlineExamId) {
      this.showToastr('top-right', 'danger', 'Online Exam Not Found');
      // this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
    });

    this.batchService.getBatchData().subscribe((batch: BatchModel) => {
      this.batch = batch;
    });

    this.subjects = [];
    this.batch.subjects.forEach((curSubject: any) => {
      const mySubject = this.course.subjects.find(
        (subject: SubjectModel) => subject._id === curSubject.subject,
      );
      this.subjects.push(mySubject);
    });

    this.onlineExamForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      subject: new FormControl('', {
        validators: [Validators.required],
      }),
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      time: new FormControl(null, {
        validators: [Validators.required],
      }),
      duration: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [],
      }),
      eachQuestionMarks: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      totalQuestions: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      totalMarks: new FormControl(null, {
        validators: [],
      }),
      passingMarks: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
    });

    if (mode && this.onlineExamId) {
      this.onlineExamService.getOnlineExam(this.onlineExamId).subscribe(
        (onlineExam: OnlineExamModel) => {
          this.onlineExam = onlineExam;

          this.onlineExamForm.patchValue({
            title: this.onlineExam.title,
            subject: this.onlineExam.subject,
            date: this.onlineExam.date,
            time: this.onlineExam.time,
            duration: this.onlineExam.duration,
            branch: this.onlineExam.branch,
            description: this.onlineExam.description,
            eachQuestionMarks: this.onlineExam.eachQuestionMarks,
            totalQuestions: this.onlineExam.totalQuestions,
            totalMarks: this.onlineExam.totalMarks,
            passingMarks: this.onlineExam.passingMarks,
          });

          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.back();
        },
      );
    } else {
      this.loading = false;
    }
  }

  previousStep() {
    this.stepper.previous();
  }

  submitOnlineExamForm() {
    this.onlineExamForm.markAllAsTouched();
    if (this.onlineExamForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Online Exam Fields are Required');
      return;
    }

    this.stepper.next();
  }

  calculateTotalMarks() {
    const totalQuestions = this.onlineExamForm.value.totalQuestions;
    const eachQuestionMarks = this.onlineExamForm.value.eachQuestionMarks;
    const totalMarks =
      (totalQuestions ? totalQuestions : 0) * (eachQuestionMarks ? eachQuestionMarks : 0);
    this.onlineExamForm.patchValue({ totalMarks });
  }

  saveOnlineExam() {
    this.onlineExamForm.markAllAsTouched();
    if (this.onlineExamForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Online Exam Fields are Required');
      return;
    }
    this.submit = true;

    const onlineExam: any = { ...this.onlineExamForm.getRawValue() };
    onlineExam.branch = this.branchId;
    onlineExam.category = this.category._id;
    onlineExam.course = this.course._id;
    onlineExam.batch = this.batch._id;

    if (!this.onlineExam) {
      this.onlineExamService.addOnlineExam(onlineExam).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Online Exam Added Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      onlineExam._id = this.onlineExam._id;

      this.onlineExamService.editOnlineExam(onlineExam).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Online Exam Updated Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
  }

  getSubject(subjectId: string) {
    const subject = this.subjects.find((curSubject: SubjectModel) => curSubject._id === subjectId);
    if (subject) {
      return subject.subject;
    }

    return '--';
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../manage'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.onlineExamService.deleteOnlineExamId();
    this.onlineExamService.deleteOnlineExamData();
  }
}
