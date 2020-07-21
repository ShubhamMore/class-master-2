import { map } from 'rxjs/operators';
import { CourseService } from './../../../../../services/course.service';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { StudentModel } from './../../../../../models/student.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from '../../../../../services/branch.service';
import { StudentService } from '../../../../../services/student.service';
import { StudentCourseService } from '../../../../../services/student-course.service';
import { Location } from '@angular/common';
import { StudentCourseInstallmentService } from '../../../../../services/student-course-installment.service';
import { Observable } from 'rxjs';

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

  student: StudentModel;
  studentCourses: StudentCourseModel[];

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private studentService: StudentService,
    private courseService: CourseService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();

    if (!this.branchId && !this.categoryId && !this.studentId) {
      this.location.back();
      return;
    }

    this.getStudent();
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

  private getStudent() {
    this.studentService.getStudentData().subscribe((student: StudentModel) => {
      this.student = student;
    });
  }

  addStudentCourse() {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  courseInstallments(studentCourseId: string, studentCourseInstallmentId: string) {
    this.studentCourseService.setStudentCourseId(studentCourseId);
    this.studentCourseInstallmentService.setStudentCourseInstallmentId(studentCourseInstallmentId);
    this.router.navigate(['../installment'], { relativeTo: this.route });
  }

  courseEdit(studentCourseId: string, studentCourseInstallmentId: string) {
    this.studentCourseService.setStudentCourseId(studentCourseId);
    this.studentCourseInstallmentService.setStudentCourseInstallmentId(studentCourseInstallmentId);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  changeCourseStatus(studentCourseId: string, status: boolean, i: number) {}

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  getCourseName(courseId: string): Observable<string> {
    return this.courseService.getCourseName(courseId).pipe(
      map((courseName: string) => {
        return courseName;
      }),
    );
  }

  ngOnDestroy() {}
}
