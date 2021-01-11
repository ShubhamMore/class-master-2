import { StudentBranchService } from './../../student-branch.service';
import { CourseService } from './../../../../services/course.service';
import { NbToastrService } from '@nebular/theme';
import { StudentCourseModel } from './../../../../models/student-course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { StudentCourseService } from './../../../../services/student-course.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { StudentCourseInstallmentService } from './../../../../services/student-course-installment.service';
import { DateService } from './../../../../services/shared-services/date.service';

@Component({
  selector: 'ngx-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss'],
})
export class ManageCourseComponent implements OnInit, OnDestroy {
  private branchId: string;

  loading: boolean;

  type: string;

  studentCourses: StudentCourseModel[];

  constructor(
    public dateService: DateService,
    private studentBranchService: StudentBranchService,
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private courseService: CourseService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
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

    this.studentCourses = [];

    this.route.queryParams.subscribe((param: Params) => {
      this.type = param.type;

      if (!this.type) {
        this.router.navigate(['../manage'], {
          relativeTo: this.route,
          queryParams: { type: 'course' },
        });
        return;
      }

      this.studentBranchService.setType(this.type);

      this.getStudentCourses();
    });
  }

  private getStudentCourses() {
    this.studentCourseService.getStudentAllCourses(this.branchId).subscribe(
      (studentCourses: any[]) => {
        this.studentCourses = studentCourses;
        this.loading = false;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.loading = false;
      },
    );
  }

  getHeader() {
    if (this.type === 'course') {
      return null;
    } else if (this.type === 'lecture') {
      return 'Lectures';
    } else if (this.type === 'report') {
      return 'Reports';
    } else if (this.type === 'assignment') {
      return 'Assignment';
    } else if (this.type === 'exam') {
      return 'Exam';
    }
  }

  courseMaterial(studentCourse: StudentCourseModel) {
    if (this.type === 'course') {
      this.studentCourseService.setStudentCourseId(studentCourse._id);
      this.studentCourseService.setStudentCourseData(studentCourse);
      this.router.navigate(['../material'], { relativeTo: this.route });
    }
  }

  courseInstallments(studentCourse: StudentCourseModel) {
    if (this.type === 'course') {
      this.courseService.setCourseId(studentCourse.course);
      this.studentCourseService.setStudentCourseId(studentCourse._id);
      this.studentCourseService.setStudentCourseData(studentCourse);
      this.studentCourseInstallmentService.setStudentCourseInstallmentId(
        studentCourse.studentCourseInstallment,
      );
      this.router.navigate(['../installment'], { relativeTo: this.route });
    }
  }

  courseAttendance(studentCourse: StudentCourseModel) {
    if (this.type === 'report') {
      this.studentCourseService.setStudentCourseId(studentCourse._id);
      this.studentCourseService.setStudentCourseData(studentCourse);
      this.router.navigate(['../attendance'], { relativeTo: this.route });
    }
  }

  courseLecture(studentCourse: StudentCourseModel) {
    if (this.type === 'lecture') {
      this.studentCourseService.setStudentCourseId(studentCourse._id);
      this.studentCourseService.setStudentCourseData(studentCourse);
      this.router.navigate(['../lecture'], { relativeTo: this.route });
    }
  }

  coursePerformance(studentCourse: StudentCourseModel) {
    if (this.type === 'report') {
      this.studentCourseService.setStudentCourseId(studentCourse._id);
      this.studentCourseService.setStudentCourseData(studentCourse);
      this.router.navigate(['../performance'], { relativeTo: this.route });
    }
  }

  courseAssignment(studentCourse: StudentCourseModel) {
    if (this.type === 'assignment') {
      this.studentCourseService.setStudentCourseId(studentCourse._id);
      this.studentCourseService.setStudentCourseData(studentCourse);
      this.router.navigate(['../assignment'], { relativeTo: this.route });
    }
  }

  courseOnlineExams(studentCourse: StudentCourseModel) {
    if (this.type === 'exam') {
      this.studentCourseService.setStudentCourseId(studentCourse._id);
      this.studentCourseService.setStudentCourseData(studentCourse);
      this.router.navigate(['../online-test'], { relativeTo: this.route });
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
