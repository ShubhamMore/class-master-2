import { CourseModel, SubjectModel } from './../../../../../models/course.model';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { CourseService } from './../../../../../services/course.service';
import { CategoryModel, BranchModel } from './../../../../../models/branch.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../../services/branch.service';

import { ObjectId } from 'bson';

@Component({
  selector: 'ngx-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  private branchId: string;
  private courseId: string;
  course: CourseModel;
  categories: CategoryModel[];
  courseBasicDetailsForm: FormGroup;
  courseFeeDetailsForm: FormGroup;
  courseSubjectForm: FormGroup;

  inclusiveGST: boolean;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private toastrService: NbToastrService,

    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      if (param.mode) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.courseId = this.courseService.getCourseId();

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.courseId) {
      this.showToastr('top-right', 'danger', 'Course Not Available');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.courseBasicDetailsForm = new FormGroup({
      courseName: new FormControl(null, {
        validators: [Validators.required],
      }),
      duration: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.maxLength(2),
          Validators.min(1),
          Validators.max(99),
        ],
      }),
      category: new FormControl('', {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [],
      }),
    });

    this.courseSubjectForm = new FormGroup(
      {
        subjects: new FormArray([]),
      },
      { validators: this.atLeastOneSubjectValidator.bind(this) },
    );

    this.courseFeeDetailsForm = new FormGroup({
      fees: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)],
      }),
      gst: new FormControl('0', {
        validators: [
          Validators.required,
          Validators.maxLength(3),
          Validators.min(0),
          Validators.max(100),
        ],
      }),
      totalFees: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.getCategories();

    this.inclusiveGST = false;

    if (this.courseId) {
      this.courseService.getCourseForEditing(this.courseId).subscribe(
        (course: CourseModel) => {
          if (!course) {
            this.router.navigate(['../page-not-found'], { relativeTo: this.route });
            return;
          }
          this.course = course;
          this.courseBasicDetailsForm.patchValue({
            courseName: course.basicDetails.courseName,
            duration: course.basicDetails.duration,
            category: course.basicDetails.category,
            description: course.basicDetails.description,
          });

          this.courseFeeDetailsForm.patchValue({
            fees: course.feeDetails.fees,
            gst: course.feeDetails.gst,
          });

          this.inclusiveGST = course.feeDetails.inclusiveGST;
          this.calculateTotal();

          const subjects = this.getSubjects();
          subjects.controls = [];
          this.course.subjects.forEach((subject) => {
            this.addSubject(subject);
          });
          this.loading = false;
        },
        (err: any) => {
          this.router.navigate(['../page-not-found'], { relativeTo: this.route });
          return;
        },
      );
    } else {
      this.generateSubject();
      this.loading = false;
    }
  }

  private getCategories() {
    this.branchService.getBranchData().subscribe((branch: BranchModel) => {
      if (branch) {
        this.categories = branch.categories;
      }
    });

    if (!this.categories) {
      this.branchService.getBranch(this.branchId).subscribe(
        (branch: BranchModel) => {
          this.branchService.setBranchData(branch);
          this.categories = branch.categories;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    }
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

  private getSubjects() {
    return this.courseSubjectForm.get('subjects') as FormArray;
  }

  private newSubject(subjectData: any) {
    return new FormGroup({
      _id: new FormControl(subjectData._id ? subjectData._id : new ObjectId().toString(), {
        validators: [Validators.required],
      }),
      subject: new FormControl(subjectData.subject ? subjectData.subject : null, {
        validators: [Validators.required],
      }),
      status: new FormControl(subjectData.status, {
        validators: [],
      }),
    });
  }

  private addSubject(subject: any) {
    const subjects = this.getSubjects();
    subjects.push(this.newSubject(subject));
  }

  generateSubject() {
    const subject = {
      _id: new ObjectId().toString(),
      subject: '',
      status: true,
    };
    this.addSubject(subject);
  }

  deleteSubject(i: number) {
    if (i !== 0 && i !== 1) {
      const subjects = this.getSubjects();
      subjects.removeAt(i);
    }
  }

  inclusiveGSTChanged(inclusiveGST: boolean) {
    this.inclusiveGST = inclusiveGST;
    this.calculateTotal();
  }

  calculateTotal() {
    const inclusiveGST = this.inclusiveGST;
    const fee = this.courseFeeDetailsForm.value.fees;
    const gst = this.courseFeeDetailsForm.value.gst;

    if (inclusiveGST) {
      this.courseFeeDetailsForm.patchValue({ totalFees: fee });
      return;
    }
    const gstValue = (+fee / 100) * +gst;
    const totalFees = (+fee + gstValue).toString();
    this.courseFeeDetailsForm.patchValue({ totalFees });
  }

  submitBasicDetails() {
    this.courseBasicDetailsForm.markAllAsTouched();
    if (this.courseBasicDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Basic details are required');
      return;
    }
    this.stepper.next();
  }

  submitSubjects() {
    this.courseSubjectForm.markAllAsTouched();
    if (this.courseSubjectForm.invalid) {
      this.showToastr('top-right', 'danger', 'At least 1 Subject is required');
      return;
    }
    this.stepper.next();
  }

  submitFeeDetails() {
    this.courseFeeDetailsForm.markAllAsTouched();
    if (this.courseFeeDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Fee details are required');

      return;
    }
    this.stepper.next();
  }

  saveCourse() {
    this.courseBasicDetailsForm.markAllAsTouched();
    this.courseSubjectForm.markAllAsTouched();
    this.courseFeeDetailsForm.markAllAsTouched();

    if (this.courseBasicDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Basic details are required');
      return;
    } else if (this.courseSubjectForm.invalid) {
      this.showToastr('top-right', 'danger', 'At least 1 Subject is required');

      return;
    } else if (this.courseFeeDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Fee Details are required');
      return;
    }

    this.loading = true;

    const course: any = {
      branch: this.branchId,
      basicDetails: this.courseBasicDetailsForm.value,
      subjects: this.courseSubjectForm.value.subjects,
      feeDetails: this.courseFeeDetailsForm.value,
    };
    course.feeDetails.inclusiveGST = this.inclusiveGST;
    if (!this.course) {
      this.courseService.addCourse(course).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Course Added Successfully!');
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      course._id = this.course._id;

      this.courseService.editCourse(course).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Course Updated Successfully!');
          this.router.navigate(['../'], { relativeTo: this.route });
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

  getGstAmount() {
    const fee = this.courseFeeDetailsForm.value.fees;
    const gst = this.courseFeeDetailsForm.value.gst;

    const gstValue = (+fee / 100) * +gst;
    return gstValue.toString();
  }

  getCategory(categoryId: string) {
    const category = this.categories.find(
      (curCategory: CategoryModel) => curCategory._id === categoryId,
    );

    if (category) {
      return category.category;
    }

    return '--';
  }

  getSubjectsData() {
    const subjects: string[] = [];
    this.courseSubjectForm.value.subjects.forEach((subject: SubjectModel) => {
      subjects.push(subject.subject);
    });

    return subjects.join(', ');
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.courseService.deleteCourseId();
  }
}
