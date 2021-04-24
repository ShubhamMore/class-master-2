import { StudentCourseInstallmentReceiptService } from './../../../../../../services/student-course-installment-receipt.service';
import { DateService } from './../../../../../../services/shared-services/date.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StudentCourseInstallmentModel } from '../../../../../../models/student-course-installment.model';
import { StudentCourseInstallmentService } from './../../../../../../services/student-course-installment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from '../../../../../../services/branch.service';
import { StudentService } from '../../../../../../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../../../../services/course.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage-student-course-installment',
  templateUrl: './manage-student-course-installment.component.html',
  styleUrls: ['./manage-student-course-installment.component.scss'],
})
export class ManageStudentCourseInstallmentComponent implements OnInit, OnDestroy {
  loading: boolean;

  private branchId: string;
  private studentId: string;
  private categoryId: string;
  private courseId: string;
  private studentCourseInstallmentId: string;

  studentCourseInstallment: StudentCourseInstallmentModel;

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    public toastrService: NbToastrService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private studentCourseInstallmentReceiptService: StudentCourseInstallmentReceiptService,
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.categoryId = this.branchService.getCategoryId();
    this.studentId = this.studentService.getStudentId();
    this.courseId = this.courseService.getCourseId();
    this.studentCourseInstallmentId = this.studentCourseInstallmentService.getStudentCourseInstallmentId();

    if (
      !this.branchId ||
      !this.categoryId ||
      !this.courseId ||
      !this.studentId ||
      !this.studentCourseInstallmentId
    ) {
      this.back();
      return;
    }

    // New Code
    this.studentCourseInstallmentService
      .getStudentCourseInstallment(this.studentCourseInstallmentId)
      .subscribe(
        (studentCourseInstallment: StudentCourseInstallmentModel) => {
          this.studentCourseInstallmentService.setStudentCourseInstallmentData(
            studentCourseInstallment,
          );
          this.studentCourseInstallment = studentCourseInstallment;
          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.back();
        },
      );

    //  Old Code
    // this.studentCourseInstallmentService
    //   .getStudentCourseInstallmentData()
    //   .subscribe((studentCourseInstallment: StudentCourseInstallmentModel) => {
    //     this.studentCourseInstallment = studentCourseInstallment;
    //   });
    // this.loading = false;
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

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }

  editReceipt(installmentId: string, receiptId: string) {
    this.studentCourseInstallmentReceiptService.setStudentCourseInstallmentReceiptId(receiptId);
    this.studentCourseInstallmentService.setCourseInstallmentId(installmentId);
    this.router.navigate(['../edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  showReceipt(receiptId: string) {
    this.studentCourseInstallmentReceiptService.setStudentCourseInstallmentReceiptId(receiptId);
    this.router.navigate(['../receipt'], { relativeTo: this.route });
  }

  deleteReceipt(installmentId: string, receiptId: string) {
    this.loading = true;
    this.studentCourseInstallmentReceiptService
      .deleteStudentCourseInstallmentReceipt(receiptId)
      .subscribe(
        (res: any) => {
          this.studentCourseInstallmentService.setCourseInstallmentReceipt(installmentId, null);
          this.loading = false;
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.loading = false;
        },
      );
  }

  collectInstallment(installmentId: string) {
    this.studentCourseInstallmentService.setCourseInstallmentId(installmentId);
    this.router.navigate(['../collect'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
