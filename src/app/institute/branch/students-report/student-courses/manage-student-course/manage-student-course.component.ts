import { map } from 'rxjs/operators';
import { CourseService } from './../../../../../services/course.service';
import { NbToastrService } from '@nebular/theme';
import { StudentCourseModel } from '../../../../../models/student-course.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from '../../../../../services/branch.service';
import { StudentService } from '../../../../../services/student.service';
import { StudentCourseService } from '../../../../../services/student-course.service';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentCourseInstallmentService } from '../../../../../services/student-course-installment.service';
import { Observable } from 'rxjs';
import { BatchService } from '../../../../../services/batch.service';
import { DateService } from '../../../../../services/shared-services/date.service';

@Component({
  selector: 'ngx-manage-student-course',
  templateUrl: './manage-student-course.component.html',
  styleUrls: ['./manage-student-course.component.scss'],
})
export class ManageStudentCourseComponent implements OnInit, OnDestroy {
  private branchId: string;
  private studentId: string;
  private categoryId: string;

  loading: boolean;

  studentCourses: StudentCourseModel[];

  constructor(
    public dateService: DateService,
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private studentService: StudentService,
    private courseService: CourseService,
    private batchService: BatchService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();

    if (!this.branchId || !this.categoryId || !this.studentId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.studentCourses = [];
    this.getStudentCourses();
  }

  private getStudentCourses() {
    this.studentCourseService
      .getStudentCourses(this.branchId, this.categoryId, this.studentId)
      .subscribe(
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

  courseAttendance(studentCourse: StudentCourseModel) {
    this.studentCourseService.setStudentCourseId(studentCourse._id);
    this.studentCourseService.setStudentCourseData(studentCourse);
    this.router.navigate(['../attendance'], { relativeTo: this.route });
  }

  coursePerformance(studentCourse: StudentCourseModel) {
    this.studentCourseService.setStudentCourseId(studentCourse._id);
    this.studentCourseService.setStudentCourseData(studentCourse);
    this.router.navigate(['../performance'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  getStudentName(): Observable<string> {
    return this.studentService.getStudentName().pipe(
      map((studentName: string) => {
        return studentName;
      }),
    );
  }

  getCourseName(courseId: string): Observable<string> {
    return this.courseService.getCourseName(courseId).pipe(
      map((courseName: string) => {
        return courseName;
      }),
    );
  }

  getBatchName(BatchId: string): Observable<string> {
    return this.batchService.getBatchName(BatchId).pipe(
      map((batchName: string) => {
        return batchName;
      }),
    );
  }

  back() {
    const type = this.studentService.getStudentType();
    this.router.navigate(['../../'], { relativeTo: this.route, queryParams: { type } });
  }

  ngOnDestroy() {}
}
