import { CourseModel } from './../../../../../models/course.model';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CourseService } from './../../../../../services/course.service';
import { CategoryModel, BranchModel } from './../../../../../models/branch.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../../services/branch.service';
import { Location } from '@angular/common';
import { ObjectId } from 'bson';

@Component({
  selector: 'ngx-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit, OnDestroy {
  loading: boolean;
  private branchId: string;
  private courseId: string;
  course: CourseModel;
  categories: CategoryModel[];
  courseForm: FormGroup;
  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.location.back();
      return;
    }

    this.courseId = this.courseService.getCourseId();

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid PRoute');
      return;
    } else if (mode && !this.courseId) {
      this.showToastr('top-right', 'danger', 'Course Not Available');
      return;
    }

    this.courseForm = new FormGroup(
      {
        courseName: new FormControl(null, {
          validators: [Validators.required],
        }),
        branch: new FormControl(this.branchId, {
          validators: [Validators.required],
        }),
        category: new FormControl('', {
          validators: [Validators.required],
        }),
        description: new FormControl(null, {
          validators: [],
        }),
        subjects: new FormArray([]),
        fees: new FormControl('0', {
          validators: [Validators.required],
        }),
        gst: new FormControl('0', {
          validators: [Validators.required],
        }),
        inclusiveGST: new FormControl(false, {
          validators: [],
        }),
        totalFees: new FormControl('0', {
          validators: [Validators.required],
        }),
      },
      { validators: this.atLeastOneSubjectValidator.bind(this) },
    );

    this.getCategories();

    if (this.courseId) {
      this.courseService.getCourseForEditing(this.courseId).subscribe(
        (course: CourseModel) => {
          if (!course) {
            this.router.navigate(['../page-not-found'], { relativeTo: this.route });
            return;
          }
          this.course = course;
          this.courseForm.patchValue({
            course: course.courseName,
            branch: course.branch,
            category: course.category,
            description: course.description,
            fees: course.fees,
            gst: course.gst,
            inclusiveGST: course.inclusiveGST,
          });
          this.calculateTotal();

          const subjects = this.courseForm.get('subjects') as FormArray;
          subjects.controls = [];
          this.course.subjects.forEach((subject) => {
            this.addSubject(subject);
          });
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
        },
      );
    } else {
      this.generateSubject();
      this.loading = false;
    }
  }

  private getCategories() {
    this.categories = this.branchService.getBranchData().categories;

    if (!this.categories) {
      this.branchService.getBranch(this.branchId).subscribe(
        (branch: BranchModel) => {
          this.branchService.setBranchData(branch);
          this.categories = branch.categories;
        },
        (error: any) => {},
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
    const subjects = this.courseForm.get('subjects') as FormArray;
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
      const subjects = this.courseForm.get('subjects') as FormArray;
      subjects.removeAt(i);
    }
  }

  calculateTotal() {
    const inclusiveGST = this.courseForm.value.inclusiveGST;
    const fee = this.courseForm.value.fees;
    const gst = this.courseForm.value.gst;
    if (inclusiveGST) {
      this.courseForm.patchValue({ total: fee });
      return;
    }
    const gstValue = (+fee / 100) * +gst;
    const total = (+fee + gstValue).toString();
    this.courseForm.patchValue({ total });
  }

  saveCourse() {
    this.courseForm.markAllAsTouched();

    if (this.courseForm.invalid) {
      return;
    }

    this.loading = true;

    if (!this.course) {
      const course = this.courseForm.value;

      this.courseService.addCourse(course).subscribe(
        (res: any) => {
          this.courseForm.reset();
          this.location.back();
        },
        (error: any) => {
          this.loading = false;
        },
      );
    } else {
      const course = this.courseForm.value;
      course._id = this.course._id;

      this.courseService.editCourse(course).subscribe(
        (res: any) => {
          this.courseForm.reset();
          this.location.back();
        },
        (error: any) => {
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
    this.courseService.deleteCourseId();
  }
}
