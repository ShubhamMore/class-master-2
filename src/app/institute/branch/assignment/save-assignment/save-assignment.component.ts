import { SubjectService } from './../../../../services/subject.service';
import { DateService } from './../../../../services/shared-services/date.service';
import { BatchModel } from './../../../../models/batch.model';
import { CategoryModel } from './../../../../models/branch.model';
import { BatchService } from './../../../../services/batch.service';
import { CourseService } from './../../../../services/course.service';
import { SubjectModel, CourseModel } from './../../../../models/course.model';
import { AssignmentModel } from './../../../../models/assignment.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { AssignmentService } from './../../../../services/assignment.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../services/branch.service';

@Component({
  selector: 'ngx-save-assignment',
  templateUrl: './save-assignment.component.html',
  styleUrls: ['./save-assignment.component.scss'],
})
export class SaveAssignmentComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;
  @ViewChild('filePicker') private fileInput: any;

  loading: boolean;
  private branchId: string;
  private assignmentId: string;
  assignment: AssignmentModel;

  uploadAssignment: File;
  fileName: string;
  invalidFile: boolean;

  batch: BatchModel;
  course: CourseModel;
  category: CategoryModel;

  subjects: SubjectModel[];

  assignmentDetailsForm: FormGroup;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    private subjectService: SubjectService,
    private assignmentService: AssignmentService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      if (param.mode) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.invalidFile = false;
    this.fileName = null;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.subjects = [];

    this.branchService.getCategoryData().subscribe((category: CategoryModel) => {
      this.category = category;
    });

    this.courseService.getCourseData().subscribe((course: CourseModel) => {
      this.course = course;
    });

    this.batchService.getBatchData().subscribe((batch: BatchModel) => {
      this.batch = batch;
    });

    this.subjectService.getSubjectsData().subscribe((subjects: SubjectModel[]) => {
      this.subjects = subjects;
    });

    this.assignmentId = this.assignmentService.getAssignmentId();

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.assignmentId) {
      this.showToastr('top-right', 'danger', 'Assignment Not Available');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.assignmentDetailsForm = new FormGroup({
      subject: new FormControl('', {
        validators: [Validators.required],
      }),
      topic: new FormControl(null, {
        validators: [Validators.required],
      }),
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      submissionDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      totalGrades: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    if (this.assignmentId) {
      this.assignmentService
        .getAssignment(this.assignmentId)
        .subscribe((assignment: AssignmentModel) => {
          if (!assignment) {
            this.router.navigate(['../page-not-found'], { relativeTo: this.route });
            return;
          }
          this.assignment = assignment;

          this.assignmentDetailsForm.patchValue({
            subject: assignment.subject,
            topic: assignment.topic,
            date: assignment.date,
            submissionDate: assignment.submissionDate,
            totalGrades: assignment.totalGrades,
            description: assignment.description,
          });

          this.fileName = assignment.fileName;

          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  onFilePicked(event: Event) {
    this.invalidFile = false;
    const files = (event.target as HTMLInputElement).files;
    const fileExt: string[] = ['pdf', 'jpg', 'png', 'jpeg', 'mp4'];
    let ext: string = null;
    ext = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
    if (!(fileExt.indexOf(ext) !== -1)) {
      this.invalidFile = true;
      this.fileName = files[0].name;
      this.fileInput.nativeElement.value = '';
      return;
    }
    this.invalidFile = false;
    this.uploadAssignment = files[0];
    this.fileName = files[0].name;
    this.fileInput.nativeElement.value = '';
  }

  clearFile() {
    this.uploadAssignment = null;
    this.fileName = null;
    this.fileInput.nativeElement.value = '';
    this.invalidFile = false;
  }

  submitAssignmentDetails() {
    this.assignmentDetailsForm.markAllAsTouched();
    if (this.assignmentDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Assignment details are required');
      return;
    } else if (this.invalidFile) {
      this.showToastr('top-right', 'danger', 'Select Valid File');
      return;
    }
    this.stepper.next();
  }

  saveAssignment() {
    this.assignmentDetailsForm.markAllAsTouched();

    if (this.assignmentDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Assignment details are required');
      return;
    } else if (this.invalidFile) {
      this.showToastr('top-right', 'danger', 'Select Valid File');
      return;
    }

    this.loading = true;

    const assignment = new FormData();

    assignment.append('branch', this.branchId);
    assignment.append('category', this.course.basicDetails.category);
    assignment.append('course', this.course._id);
    assignment.append('batch', this.batch._id);
    assignment.append('subject', this.assignmentDetailsForm.value.subject);
    assignment.append('topic', this.assignmentDetailsForm.value.topic);
    assignment.append('date', this.assignmentDetailsForm.value.date);
    assignment.append('description', this.assignmentDetailsForm.value.description);
    assignment.append('submissionDate', this.assignmentDetailsForm.value.submissionDate);
    assignment.append('totalGrades', this.assignmentDetailsForm.value.totalGrades);

    if (this.uploadAssignment) {
      assignment.append(
        'assignment',
        this.uploadAssignment,
        this.uploadAssignment.name.substring(0, this.uploadAssignment.name.lastIndexOf('.')),
      );
    }

    if (!this.assignment) {
      this.assignmentService.saveAssignment(assignment).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Assignment Added Successfully!');
          this.router.navigate(['../manage'], { relativeTo: this.route });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      assignment.append('_id', this.assignment._id);

      this.assignmentService.updateAssignment(assignment).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Assignment Updated Successfully!');
          this.router.navigate(['../manage'], { relativeTo: this.route });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
  }

  getSubjectName(id: string) {
    const subject = this.subjects.find((curSubject: SubjectModel) => curSubject._id === id);
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
    // this.assignmentService.deleteAssignmentId();
  }
}
