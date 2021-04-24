import { StudentCourseService } from './../../services/student-course.service';
import { StudentCourseModel } from '../../models/student-course.model';
import { BranchModel } from '../../models/branch.model';
import { BranchService } from './../../services/branch.service';
import {
  StudentCourseInstallmentModel,
  InstallmentModel,
} from '../../models/student-course-installment.model';
import { InstituteOrderService } from './../../services/institute-order.service';
import { StudentCourseInstallmentService } from './../../services/student-course-installment.service';
import { InstituteKeysService } from './../../services/institute-keys.service';
import { AuthService } from './../../authentication/auth/auth-service/auth.service';
import { PaymentService } from './../../services/payment.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare const Razorpay: any;
@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  loading: boolean;
  private user: any;
  private branchId: string;
  private orderDetails: any;
  private options: any;
  private razorPay: any;
  private placedOrderReceipt: any;

  branch: BranchModel;

  private paymentGatewayAccessKey: string;

  studentCourseInstallment: StudentCourseInstallmentModel;
  courseInstallment: InstallmentModel;
  studentCourse: StudentCourseModel;

  constructor(
    private branchService: BranchService,
    private paymentService: PaymentService,
    private instituteKeysService: InstituteKeysService,
    private studentCourseService: StudentCourseService,
    private studentCourseInstallmentService: StudentCourseInstallmentService,
    private instituteOrderService: InstituteOrderService,
    private authService: AuthService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<PaymentComponent>, // private router: Router, // private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.user = this.authService.getUserData();

    this.branchId = this.branchService.getBranchId();

    this.branchService.getBranchData().subscribe((branch: BranchModel) => {
      this.branch = branch;
    });

    this.studentCourseService
      .getStudentCourseData()
      .subscribe((studentCourse: StudentCourseModel) => {
        this.studentCourse = studentCourse;
      });

    this.paymentGatewayAccessKey = this.instituteKeysService.getLocalInstitutePaymentAccessKey();

    if (!this.branchId || !this.paymentGatewayAccessKey) {
      this.onClose();
      return;
    }

    this.studentCourseInstallmentService
      .getStudentCourseInstallmentData()
      .subscribe((studentCourseInstallment: StudentCourseInstallmentModel) => {
        this.studentCourseInstallment = studentCourseInstallment;
      });

    this.studentCourseInstallmentService
      .getCourseInstallmentData()
      .subscribe((courseInstallment: InstallmentModel) => {
        this.courseInstallment = courseInstallment;
      });

    this.orderDetails = {
      userId: this.user._id,
      userPhone: this.user.phone,
      userName: this.user.name,
      userEmail: this.user.email,
      imsMasterId: this.user.imsMasterId,
      amount: this.courseInstallment.installmentAmount,
      studentInstallment: this.studentCourseInstallment._id,
      installment: this.courseInstallment._id,
      branch: this.branchId,
    };

    this.options = {
      key: this.paymentGatewayAccessKey, // Enter the Key ID generated from the Dashboard
      amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: this.branch ? this.branch.basicDetails.branchName : 'Institute Fees',
      description: this.getPaymentDescription(),
      // image: '../../../assets/brand/the-class-master-mini.png',
      // tslint:disable-next-line: max-line-length
      order_id: '', // This is a sample Order ID. Pass the `id` obtained in the response of Step 1 order_9A33XWu170gUtm
      handler: (response: any) => {
        this.verifyPayment(response);
      },
      modal: {
        ondismiss: () => {
          this.deleteOrder();
        },
      },
      prefill: {
        name: this.user.name,
        email: this.user.email,
        contact: this.user.phone,
      },
      notes: {
        address: '',
      },
      theme: {
        color: '#528FF0',
      },
    };

    this.razorPay = new Razorpay(this.options);

    this.generateOrder();

    this.loading = false;
  }

  getPaymentDescription() {
    return `Installment ${this.courseInstallment.installmentNo} of Course ${this.studentCourse.courseName}`;
  }

  private generateOrder() {
    this.instituteOrderService.generateInstituteOrder(this.orderDetails).subscribe(
      (res: any) => {
        this.placedOrderReceipt = res.paymentReceipt;
        // this.options.amount = res.order.amount;
        this.options.amount = '1';
        this.options.order_id = res.order.id;
        this.options.currency = res.order.currency;
        this.options.prefill.name = this.user.name;
        this.options.prefill.email = this.user.email;
        this.options.prefill.contact = this.user.phone;
        this.razorPay = new Razorpay(this.options);
        this.pay();
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.onClose();
      },
    );
  }

  private pay() {
    this.razorPay.open();
  }

  private deleteOrder() {
    this.instituteOrderService.deleteInstituteOrder(this.placedOrderReceipt._id).subscribe(
      (res: any) => {
        this.placedOrderReceipt = null;
        this.ref.close({ status: false });
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
        this.onClose();
      },
    );
  }

  verifyPayment(payment: any) {
    this.paymentService
      .verifyInstitutePayment(this.branchId, payment, this.placedOrderReceipt)
      .subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Payment Verified Successfully');
          this.ref.close({ status: true, order: res.orderId, receipt: res.receiptId });
        },
        (err: any) => {
          this.showToastr('top-right', 'danger', err);
          this.onClose();
        },
      );
  }

  onClose() {
    this.ref.close();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {}
}
