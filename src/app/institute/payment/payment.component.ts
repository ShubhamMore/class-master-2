import { BranchService } from './../../services/branch.service';
import { CouponService } from './../../services/coupon.service';
import { OrderService } from './../../services/order.service';
import { environment } from './../../../environments/environment.prod';
import { AuthService } from './../../authentication/auth/auth-service/auth.service';
import { PaymentService } from './../../services/payment.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { Component, OnInit, OnDestroy } from '@angular/core';

declare const Razorpay: any;

interface Coupon {
  code: string;
  discount: string;
  discountAmount: number;
  totalAmount: string;
  discountType?: string;
}
@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  loading: boolean;

  private user: any;
  private orderDetails: any;
  private options: any;
  private razorPay: any;
  private placedOrderReceipt: any;

  paymentDetails: { planType: string; packageType: string; amount: string; type?: string };

  constructor(
    private branchService: BranchService,
    private paymentService: PaymentService,
    private couponService: CouponService,
    private orderService: OrderService,
    private authService: AuthService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<PaymentComponent>, // private router: Router, // private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.user = this.authService.getUserData();
    this.paymentDetails = this.paymentService.getPaymentDetails();

    this.options = {
      key: environment.razorpayKeyId, // Enter the Key ID generated from the Dashboard
      amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'IMS Master',
      description: 'The Class Master Transaction',
      image: '../../../assets/brand/class-master-mini.png',
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

    const coupon: Coupon = this.couponService.getAppliedCoupon();

    const branchId = this.branchService.getBranchId();

    this.orderDetails = {
      branch: branchId,
      userId: this.user.imsMasterId,
      userPhone: this.user.phone,
      userName: this.user.name,
      userEmail: this.user.email,
      imsMasterId: this.user.imsMasterId,
      amount: this.paymentDetails.amount,
      packageType: this.paymentDetails.packageType,
      planType: this.paymentDetails.planType,
    };

    if (coupon) {
      this.orderDetails.coupon = coupon.code;
    }

    this.generateOrder();

    this.loading = false;
  }

  private generateOrder() {
    if (this.paymentDetails.planType === 'membership') {
      this.orderService.generateMembershipOrder(this.orderDetails).subscribe(
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
    } else if (this.paymentDetails.planType === 'storage') {
      this.orderDetails.type = this.paymentDetails.type;
      this.orderService.generateStorageOrder(this.orderDetails).subscribe(
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
    } else if (this.paymentDetails.planType === 'sms') {
      this.orderService.generateSMSOrder(this.orderDetails).subscribe(
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
    } else {
      this.showToastr('top-right', 'danger', 'Invalid Plan');
      this.onClose();
    }
  }

  private pay() {
    this.razorPay.open();
  }

  private deleteOrder() {
    this.orderService.deleteOrder(this.placedOrderReceipt._id).subscribe(
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
    this.paymentService.verifyPayment(payment, this.placedOrderReceipt).subscribe(
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

  ngOnDestroy() {
    this.couponService.deleteAppliedCoupon();
  }
}
