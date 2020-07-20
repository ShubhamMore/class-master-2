import { CourseService } from './../../../../../services/course.service';
import { BranchService } from './../../../../../services/branch.service';
import { CourseModel } from './../../../../../models/course.model';
import { CategoryModel, BranchModel } from './../../../../../models/branch.model';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'ngx-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss'],
})
export class ManageCourseComponent implements OnInit {
  loading: boolean;
  branchId: string;
  category: string;
  categories: CategoryModel[];
  courses: CourseModel[];

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

    this.courses = [];
    this.categories = [];
    this.category = '';

    this.branchService.getBranch(this.branchId).subscribe(
      (branch: BranchModel) => {
        this.branchService.setBranchData(branch);
        this.categories = branch.categories;
        this.getCourses('');
      },
      (err: any) => {
        // this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      },
    );
  }

  getCourses(category: any) {
    this.loading = true;
    this.category = category;
    this.courseService.getCourses(this.branchId, category).subscribe(
      (courses: CourseModel[]) => {
        this.courses = courses;
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      },
    );
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

  addCourse() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  courseBatches(course: CourseModel) {
    this.courseService.setCourseData(course);
    this.router.navigate(['../batch'], { relativeTo: this.route });
  }

  editCourse(id: string) {
    this.courseService.setCourseId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  changeCourseStatus(id: string, status: boolean, i: number) {
    this.loading = true;
    this.courseService.changeCourseStatus(id, status).subscribe(
      (res: any) => {
        this.courses[i].status = status;
        this.showToastr(
          'top-right',
          'success',
          `Course ${status ? 'Activated' : 'Deactivated'} Successfully!`,
        );
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
