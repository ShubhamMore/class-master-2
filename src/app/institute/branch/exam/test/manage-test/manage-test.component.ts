import { BatchService } from './../../../../../services/batch.service';
import { CourseService } from './../../../../../services/course.service';
import { BatchModel } from './../../../../../models/batch.model';
import { CourseModel } from './../../../../../models/course.model';
import { CategoryModel, BranchModel } from './../../../../../models/branch.model';
import { ExamModel } from './../../../../../models/exam.model';
import { ExamService } from './../../../../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TestModule } from '../test.module';
import { NbTreeGridSortService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage-test',
  templateUrl: './manage-test.component.html',
  styleUrls: ['./manage-test.component.scss'],
})
export class ManageTestComponent implements OnInit {
  loading: boolean;
  branchId: string;

  exams: ExamModel[];
  categories: CategoryModel[];
  category: string;
  courses: CourseModel[];
  myCourses: CourseModel[];
  course: string;
  batches: BatchModel[];
  myBatches: BatchModel[];
  batch: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private batchService: BatchService,
    private toastrService: NbToastrService,
    private examService: ExamService,
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
  }

  private getCategories() {
    this.categories = this.branchService.getBranchData().categories;

    if (!this.categories) {
      this.branchService.getBranch(this.branchId).subscribe(
        (branch: BranchModel) => {
          this.branchService.setBranchData(branch);
          this.categories = branch.categories;
          this.getExams(this.category, this.course);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
    } else {
      this.getExams(this.category, this.course);
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
    this.getExams(this.category, this.course);
  }

  onSelectCourse(course: string) {
    this.course = course;
    this.getExams(this.category, this.course);
  }

  getExams(category: string, course: string) {
    this.loading = true;
    // this.examService.getExams(this.branchId, category, course).subscribe(
    //   (exams: ExamModel[]) => {
    //     this.exams = exams;
    //     this.loading = false;
    //   },
    //   (error: any) => {
    //     this.showToastr('top-right', 'danger', error);
    //     this.loading = false;
    //   },
    // );
  }

  editExam(id: string) {
    // this.examService.setExamId(id);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  deleteExam(id: string) {
    this.examService.deleteExam(id).subscribe(
      (res: any) => {
        this.removeExam(id);
        this.showToastr('top-right', 'success', 'Exam Deleted Successfully');
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  private removeExam(id: string) {
    const index = this.exams.findIndex((exam: ExamModel) => exam._id === id);
    if (index >= 0) {
      this.exams.splice(index, 1);
    }
  }

  wonExam(id: string) {
    // this.examService.changeExamStatus(id, 'won').subscribe(
    //   (res: any) => {
    //     this.removeExam(id);
    //   },
    //   (error: any) => {
    //     this.showToastr('top-right', 'danger', error);
    //   },
    // );
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
