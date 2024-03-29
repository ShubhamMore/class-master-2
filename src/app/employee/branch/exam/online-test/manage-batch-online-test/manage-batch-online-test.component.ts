import { DateService } from './../../../../../services/shared-services/date.service';
import { BatchService } from './../../../../../services/batch.service';
import { CourseService } from './../../../../../services/course.service';
import { BatchModel } from '../../../../../models/batch.model';
import { CourseModel } from '../../../../../models/course.model';
import { CategoryModel, BranchModel } from '../../../../../models/branch.model';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-manage-batch-online-test',
  templateUrl: './manage-batch-online-test.component.html',
  styleUrls: ['./manage-batch-online-test.component.scss'],
})
export class ManageBatchOnlineTestComponent implements OnInit {
  loading: boolean;
  branchId: string;

  categories: CategoryModel[];
  category: string;
  courses: CourseModel[];
  myCourses: CourseModel[];
  course: string;
  batches: BatchModel[];

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    private courseService: CourseService,
    private batchService: BatchService,
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
    this.categories = [];
    this.courses = [];
    this.myCourses = [];
    this.batches = [];

    this.category = '';
    this.course = '';

    this.getCategories();
    this.getCourses();
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
          this.getBatches(this.category, this.course);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          // this.loading = false;
        },
      );
    } else {
      this.getBatches(this.category, this.course);
    }
  }

  private getCourses() {
    this.courseService.getCoursesData().subscribe((courses: CourseModel[]) => {
      this.courses = courses;
    });
  }

  onSelectCategory(category: string) {
    this.category = category;
    this.course = '';
    this.myCourses = this.courses.filter(
      (course: CourseModel) => course.basicDetails.category === category,
    );
    this.getBatches(this.category, this.course);
  }

  onSelectCourse(course: string) {
    this.course = course;
    this.getBatches(this.category, this.course);
  }

  getBatches(category: string, course: string) {
    this.loading = true;
    this.batchService.getBatches(this.branchId, category, course).subscribe(
      (batches: BatchModel[]) => {
        this.batches = batches;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  manageOnlineExam(batch: BatchModel) {
    this.batchService.setBatchId(batch._id);
    this.batchService.setBatchData(batch);

    this.courseService.setCourseId(batch.course);
    const myCourse = this.courses.find((curCourse: CourseModel) => curCourse._id === batch.course);
    this.courseService.setCourseData(myCourse);

    this.branchService.setCategoryId(batch.category);
    const myCategory = this.categories.find(
      (curCategory: CategoryModel) => curCategory._id === batch.category,
    );
    this.branchService.setCategoryData(myCategory);

    this.router.navigate(['../manage'], { relativeTo: this.route });
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

  getCourse(courseId: string) {
    const course = this.courses.find((curCourse: CourseModel) => curCourse._id === courseId);

    if (course) {
      return course.basicDetails.courseName;
    }

    return '--';
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
