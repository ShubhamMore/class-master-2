import { StudentCourseService } from './../../../../../services/student-course.service';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { StudentCourseInstallmentReceiptService } from './../../../../../services/student-course-installment-receipt.service';
import { DateService } from './../../../../../services/shared-services/date.service';
import { StudentCourseInstallmentModel } from './../../../../../models/student-course-installment.model';
import { StudentCourseInstallmentService } from './../../../../../services/student-course-installment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage-course-installment',
  templateUrl: './manage-course-installment.component.html',
  styleUrls: ['./manage-course-installment.component.scss'],
})
export class ManageCourseInstallmentComponent implements OnInit, OnDestroy {
  loading: boolean;

  private branchId: string;
  private studentCourseInstallmentId: string;

  studentCourseInstallment: StudentCourseInstallmentModel;
  studentCourse: StudentCourseModel;

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    public toastrService: NbToastrService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private studentCourseInstallmentReceiptService: StudentCourseInstallmentReceiptService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    this.studentCourseInstallmentId = this.studentCourseInstallmentService.getStudentCourseInstallmentId();

    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }

    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;
      });

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
          this.router.navigate(['../'], { relativeTo: this.route });
        },
      );
  }
  showReceipt(receiptId: string) {
    this.studentCourseInstallmentReceiptService.setStudentCourseInstallmentReceiptId(receiptId);
    this.router.navigate(['../receipt'], { relativeTo: this.route });
  }
  payInstallment(installmentId: string) {
    this.studentCourseInstallmentService.setCourseInstallmentId(installmentId);
    // this.router.navigate(['../collect'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {}
}
