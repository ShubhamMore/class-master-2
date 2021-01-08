import { ExamService } from './../../../../../../services/exam.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { BatchService } from './../../../../../../services/batch.service';
import { CourseService } from './../../../../../../services/course.service';
import { BatchModel } from './../../../../../../models/batch.model';
import { CourseModel, SubjectModel } from './../../../../../../models/course.model';
import { CategoryModel, BranchModel } from './../../../../../../models/branch.model';
import { ExamModel } from './../../../../../../models/exam.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../../../services/branch.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DateService } from '../../../../../../services/shared-services/date.service';

@Component({
  selector: 'ngx-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss'],
})
export class AddTestComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  branchId: string;
  category: CategoryModel;
  course: CourseModel;
  batch: BatchModel;
  examForm: FormGroup;
  examId: string;
  exam: ExamModel;
  subjects: SubjectModel[];

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    public dateService: DateService,
    private batchService: BatchService,
    private examService: ExamService,
    private toastrService: NbToastrService,
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

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    this.examId = this.examService.getExamId();

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      // this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.examId) {
      this.showToastr('top-right', 'danger', 'Exam Not Found');
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

    this.examForm = new FormGroup({
      examTitle: new FormControl(null, { validators: [Validators.required] }),
      subject: new FormControl(null, { validators: [Validators.required] }),
      outOfMarks: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
      passingMarks: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      time: new FormControl(null, { validators: [Validators.required] }),
      duration: new FormControl(null, { validators: [Validators.required, Validators.min(0)] }),
    });

    if (mode && this.examId) {
      this.examService.getExam(this.examId).subscribe(
        (exam: ExamModel) => {
          this.exam = exam;

          this.examForm.patchValue({
            examTitle: this.exam.examTitle,
            subject: this.exam.subject,
            outOfMarks: this.exam.outOfMarks,
            passingMarks: this.exam.passingMarks,
            date: this.exam.date,
            time: this.exam.time,
            duration: this.exam.duration,
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

  submitExamForm() {
    this.examForm.markAllAsTouched();
    if (this.examForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Exam Fields are Required');
      return;
    }

    this.stepper.next();
  }

  saveExam() {
    this.examForm.markAllAsTouched();
    if (this.examForm.invalid) {
      this.showToastr('top-right', 'danger', 'All Exam Fields are Required');
      return;
    }

    this.loading = true;

    const exam: any = this.examForm.value;
    exam.branch = this.branchId;
    exam.category = this.category._id;
    exam.course = this.course._id;
    exam.batch = this.batch._id;

    if (!this.exam) {
      this.examService.saveExam(exam).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Exam Added Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      exam._id = this.exam._id;
      exam.marks = this.exam.marks;
      this.examService.editExam(exam).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Exam Updated Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
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
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // this.examService.deleteExamId();
    // this.examService.deleteExamData();
  }
}
