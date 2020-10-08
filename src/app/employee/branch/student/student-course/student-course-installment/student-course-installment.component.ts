import { Observable, BehaviorSubject } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { CourseService } from './../../../../../services/course.service';
import { StudentCourseInstallmentModel } from './../../../../../models/student-course-installment.model';
import { StudentCourseInstallmentService } from './../../../../../services/student-course-installment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from '../../../../../services/branch.service';
import { StudentService } from '../../../../../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-student-course-installment',
  templateUrl: './student-course-installment.component.html',
  styleUrls: ['./student-course-installment.component.scss'],
})
export class StudentCourseInstallmentComponent implements OnInit, OnDestroy {
  private branchId: string;
  private categoryId: string;
  private courseId: string;
  private studentId: string;
  private studentCourseInstallmentId: string;
  loading: boolean;

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private studentService: StudentService,
    private courseService: CourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.courseId = this.courseService.getCourseId();
    this.studentId = this.studentService.getStudentId();
    this.studentCourseInstallmentId = this.studentCourseInstallmentService.getStudentCourseInstallmentId();

    if (
      !this.branchId ||
      !this.categoryId ||
      !this.courseId ||
      !this.studentId ||
      !this.studentCourseInstallmentId
    ) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.studentCourseInstallmentService
      .getStudentCourseInstallment(this.studentCourseInstallmentId)
      .subscribe(
        (studentCourseInstallment: StudentCourseInstallmentModel) => {
          this.studentCourseInstallmentService.setStudentCourseInstallmentData(
            studentCourseInstallment,
          );
          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.courseService.deleteCourseId();
    this.studentCourseInstallmentService.deleteStudentCourseInstallmentId();
    this.studentCourseInstallmentService.deleteStudentCourseInstallmentData();
  }
}
