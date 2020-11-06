import { CourseService } from './../../../../services/course.service';
import { NbToastrService } from '@nebular/theme';
import { StudentCourseModel } from './../../../../models/student-course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../services/branch.service';
import { StudentCourseService } from './../../../../services/student-course.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  studentCourses: StudentCourseModel[];

  constructor(
    public dateService: DateService,
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
    this.getStudentCourses();
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

  courseInstallments(studentCourse: StudentCourseModel) {
    this.courseService.setCourseId(studentCourse.course);
    this.studentCourseService.setStudentCourseId(studentCourse._id);
    this.studentCourseService.setStudentCourseData(studentCourse);
    this.studentCourseInstallmentService.setStudentCourseInstallmentId(
      studentCourse.studentCourseInstallment,
    );
    this.router.navigate(['../installment'], { relativeTo: this.route });
  }

  courseAttendance(studentCourse: StudentCourseModel) {
    this.studentCourseService.setStudentCourseId(studentCourse._id);
    this.studentCourseService.setStudentCourseData(studentCourse);
    this.router.navigate(['../attendance'], { relativeTo: this.route });
  }

  courseLecture(studentCourse: StudentCourseModel) {
    this.studentCourseService.setStudentCourseId(studentCourse._id);
    this.studentCourseService.setStudentCourseData(studentCourse);
    this.router.navigate(['../lecture'], { relativeTo: this.route });
  }

  coursePerformance(studentCourse: StudentCourseModel) {
    this.studentCourseService.setStudentCourseId(studentCourse._id);
    this.studentCourseService.setStudentCourseData(studentCourse);
    this.router.navigate(['../performance'], { relativeTo: this.route });
  }

  courseAssignment(studentCourse: StudentCourseModel) {
    this.studentCourseService.setStudentCourseId(studentCourse._id);
    this.studentCourseService.setStudentCourseData(studentCourse);
    this.router.navigate(['../assignment'], { relativeTo: this.route });
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
