import { CheckoutComponent } from './../../../../checkout/checkout.component';
import { PaymentComponent } from './../../../../payment/payment.component';
import { PaymentService } from './../../../../../services/payment.service';
import { InstituteKeysService } from './../../../../../services/institute-keys.service';
import { StudentCourseService } from './../../../../../services/student-course.service';
import { StudentCourseModel } from './../../../../../models/student-course.model';
import { StudentCourseInstallmentReceiptService } from './../../../../../services/student-course-installment-receipt.service';
import { DateService } from './../../../../../services/shared-services/date.service';
import {
  InstallmentModel,
  StudentCourseInstallmentModel,
} from './../../../../../models/student-course-installment.model';
import { StudentCourseInstallmentService } from './../../../../../services/student-course-installment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BranchService } from './../../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage-course-installment',
  templateUrl: './manage-course-installment.component.html',
  styleUrls: ['./manage-course-installment.component.scss'],
})
export class ManageCourseInstallmentComponent implements OnInit, OnDestroy {
  loading: boolean;

  private branchId: string;
  private studentCourseInstallmentId: string;

  paymentGatewayAccessKey: string;

  studentCourseInstallment: StudentCourseInstallmentModel;
  studentCourse: StudentCourseModel;

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    public toastrService: NbToastrService,
    private studentCourseService: StudentCourseService,
    private instituteKeysService: InstituteKeysService,
    private paymentService: PaymentService,
    private dialogService: NbDialogService,
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
      this.router.navigate(['../../'], { relativeTo: this.route });
      return;
    }

    this.paymentGatewayAccessKey = this.instituteKeysService.getLocalInstitutePaymentAccessKey();

    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;
      });

    this.getStudentCourseInstallment();
  }

  getStudentCourseInstallment() {
    this.loading = true;
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
          this.loading = false;
        },
      );
  }

  showReceipt(receiptId: string) {
    this.studentCourseInstallmentReceiptService.setStudentCourseInstallmentReceiptId(receiptId);
    this.router.navigate(['../receipt'], { relativeTo: this.route });
  }

  onClosePayment(order: any) {
    if (order.status) {
      this.generateStudentCourseInstallmentReceipt(order.order, order.receipt);
    }
  }

  onCheckout(checkout: any) {
    if (checkout.status) {
      this.dialogService
        .open(PaymentComponent, {
          context: {},
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((order: any) => order && this.onClosePayment(order));
    }
  }

  payInstallment(installment: InstallmentModel) {
    if (this.paymentGatewayAccessKey) {
      this.studentCourseInstallmentService.setCourseInstallmentId(installment._id);
      this.studentCourseInstallmentService.setCourseInstallmentData(installment);
      this.dialogService
        .open(CheckoutComponent, {
          context: {},
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((checkout: any) => checkout && this.onCheckout(checkout));
    }
  }

  generateStudentCourseInstallmentReceipt(order: string, receipt: string) {
    this.loading = true;
    this.studentCourseInstallmentReceiptService
      .generateStudentCourseInstallmentReceipt(order, receipt)
      .subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Receipt Generated Successfully');
          this.getStudentCourseInstallment();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
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
    // this.studentCourseInstallmentService.deleteStudentCourseInstallmentData();
  }
}
