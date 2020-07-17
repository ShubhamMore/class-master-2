import { BranchEmployeeModel } from './../../../../../../../models/branch-employee.model';
import { CourseService } from './../../../../../../../services/course.service';
import { SubjectModel, CourseModel } from './../../../../../../../models/course.model';
import { BatchModel, BatchSubjectModel } from './../../../../../../../models/batch.model';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { BatchService } from './../../../../../../../services/batch.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../../../../services/branch.service';
import { Location } from '@angular/common';
import { ObjectId } from 'bson';
import { BranchEmployeeService } from '../../../../../../../services/employee-branch.service';
@Component({
  selector: 'ngx-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.scss'],
})
export class AddBatchComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  private branchId: string;
  private batchId: string;
  batch: BatchModel;
  course: CourseModel;
  teachers: BranchEmployeeModel[];
  subjects: SubjectModel[];
  batchBasicDetailsForm: FormGroup;
  batchSubjectForm: FormGroup;

  constructor(
    private branchService: BranchService,
    private branchEmployeeService: BranchEmployeeService,
    private batchService: BatchService,
    private courseService: CourseService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.location.back();
      return;
    }

    this.course = this.courseService.getCourseData();
    if (!this.course) {
      this.location.back();
      return;
    }

    this.batchId = this.batchService.getBatchId();

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.batchId) {
      this.showToastr('top-right', 'danger', 'Batch Not Available');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.batchBasicDetailsForm = new FormGroup({
      batchName: new FormControl(null, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      rollNoPrefix: new FormControl(null, {
        validators: [],
      }),
      description: new FormControl(null, {
        validators: [],
      }),
    });

    this.batchSubjectForm = new FormGroup(
      {
        subjects: new FormArray([]),
      },
      { validators: this.atLeastOneSubjectValidator.bind(this) },
    );

    this.teachers = [];
    this.subjects = this.course.subjects.filter((subject: SubjectModel) => subject.status);

    this.subjects.forEach((subject: SubjectModel) => {
      const batchSubject = {
        _id: new ObjectId(),
        subject: subject._id,
        teacher: '',
        status: true,
      };
      this.addBatchSubject(batchSubject);
    });

    this.branchEmployeeService.getBranchEmployeesForBatch(this.branchId, 'teacher').subscribe(
      (teachers: BranchEmployeeModel[]) => {
        this.teachers = teachers;

        if (this.batchId) {
          this.batchService.getBatchForEditing(this.batchId).subscribe(
            (batch: BatchModel) => {
              if (!batch) {
                this.router.navigate(['../page-not-found'], { relativeTo: this.route });
                return;
              }
              this.batch = batch;
              this.batchBasicDetailsForm.patchValue({
                batchName: batch.basicDetails.batchName,
                startDate: batch.basicDetails.startDate,
                duration: batch.basicDetails.rollNoPrefix,
                description: batch.basicDetails.description,
              });

              const batchSubjects = batch.subjects;

              this.subjects.forEach((curSubject: SubjectModel, i: number) => {
                const subject = batchSubjects.find(
                  (curBatchSubject: BatchSubjectModel) =>
                    curBatchSubject.subject === curSubject._id,
                );

                let teacher: string = '';
                if (subject) {
                  this.changeSubjectStatus(subject.status, i);
                  this.getBatchSubjects().controls[i].get('_id').setValue(subject._id);
                  if (
                    teachers.find(
                      (curTeacher: BranchEmployeeModel) => curTeacher.employee === subject.teacher,
                    )
                  ) {
                    teacher = subject.teacher;
                  }
                }
                this.getBatchSubjects().controls[i].get('teacher').setValue(teacher);
              });
              this.loading = false;
            },
            (err: any) => {
              this.router.navigate(['../page-not-found'], { relativeTo: this.route });
              return;
            },
          );
        } else {
          this.loading = false;
        }
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  private atLeastOneSubjectValidator(group: FormGroup): { [s: string]: boolean } {
    const subjects = group.value.subjects;
    let status = false;
    subjects.forEach((subject: any) => {
      if (subject.status) {
        status = true;
      }
    });

    if (!status) {
      return { atLeastOneSubjectError: true };
    }
    return null;
  }

  private getBatchSubjects() {
    return this.batchSubjectForm.get('subjects') as FormArray;
  }

  private newBatchSubject(batchSubject: any) {
    return new FormGroup({
      _id: new FormControl(batchSubject._id ? batchSubject._id : new ObjectId().toString(), {
        validators: [Validators.required],
      }),
      subject: new FormControl(batchSubject.subject ? batchSubject.subject : null, {
        validators: [Validators.required],
      }),
      teacher: new FormControl(batchSubject.teacher ? batchSubject.teacher : '', {
        validators: [],
      }),
      status: new FormControl(batchSubject.status ? batchSubject.status : true, {
        validators: [],
      }),
    });
  }

  private addBatchSubject(batchSubject: any) {
    const subjects = this.getBatchSubjects();
    subjects.push(this.newBatchSubject(batchSubject));
  }

  changeSubjectStatus(status: boolean, i: number) {
    const batchSubject = this.getBatchSubjects().controls[i];
    batchSubject.get('status').setValue(status);
    if (status) {
      batchSubject.get('teacher').enable();
    } else {
      batchSubject.get('teacher').setValue('');
      batchSubject.get('teacher').disable();
    }
  }

  getSubjectName(id: string) {
    const subject = this.subjects.find((curSubject: SubjectModel) => curSubject._id === id);
    if (subject) {
      return subject.subject;
    }

    return '--';
  }

  getTeacherName(id: string) {
    const teacher = this.teachers.find(
      (curTeacher: BranchEmployeeModel) => curTeacher.employee === id,
    );
    if (teacher) {
      return teacher.employee;
    }

    return '--';
  }

  submitBasicDetails() {
    this.batchBasicDetailsForm.markAllAsTouched();
    if (this.batchBasicDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Basic details are required');
      return;
    }
    this.stepper.next();
  }

  submitSubjects() {
    this.batchSubjectForm.markAllAsTouched();
    if (this.batchSubjectForm.invalid) {
      this.showToastr('top-right', 'danger', 'At least 1 Subject is required');
      return;
    }
    this.stepper.next();
  }

  saveBatch() {
    this.batchBasicDetailsForm.markAllAsTouched();
    this.batchSubjectForm.markAllAsTouched();

    if (this.batchBasicDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Basic details are required');
      return;
    } else if (this.batchSubjectForm.invalid) {
      this.showToastr('top-right', 'danger', 'At least 1 Subject is required');
      return;
    }

    this.loading = true;

    const batch: any = {
      branch: this.branchId,
      category: this.course.basicDetails.category,
      course: this.course._id,
      basicDetails: this.batchBasicDetailsForm.value,
      subjects: this.batchSubjectForm.value.subjects,
    };
    if (!this.batch) {
      this.batchService.addBatch(batch).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Batch Added Successfully!');
          this.location.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      batch._id = this.batch._id;

      this.batchService.editBatch(batch).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Batch Updated Successfully!');
          this.location.back();
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

  back() {
    this.location.back();
  }

  ngOnDestroy() {
    this.batchService.deleteBatchId();
  }
}