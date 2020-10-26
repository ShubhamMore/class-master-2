import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CheckoutService } from '../../services/checkout.service';
import { CouponService } from '../../services/coupon.service';
import { PaymentService } from '../../services/payment.service';

interface Coupon {
  code: string;
  discount: string;
  discountAmount: number;
  totalAmount: string;
  discountType?: string;
}

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutData: any;

  couponCode: string;

  coupon: Coupon;

  constructor(
    private checkoutService: CheckoutService,
    private couponService: CouponService,
    private paymentService: PaymentService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<CheckoutComponent>,
  ) {}

  ngOnInit(): void {
    this.couponCode = null;
    this.checkoutData = this.paymentService.getPaymentDetails();
  }

  onClose() {
    this.ref.close({ status: false });
  }

  changeCouponCode(code: string) {
    this.couponCode = code;
  }

  calculateCouponDiscount(coupon: Coupon) {
    let amount = this.checkoutData.amount;
    let discountAmount = coupon.discountAmount;
    if (coupon.discountType === 'percentage') {
      discountAmount = (amount / 100) * coupon.discountAmount;
    }
    amount = amount - discountAmount;

    this.coupon = {
      code: coupon.code,
      discount: `${
        coupon.discountType === 'percentage'
          ? coupon.discountAmount
          : this.getAmount(coupon.discountAmount)
      }${coupon.discountType === 'percentage' ? '%' : '/-'}`,
      discountAmount: discountAmount,
      totalAmount: amount,
    };

    this.couponService.setAppliedCoupon(this.coupon);
  }

  applyCoupon() {
    if (this.couponCode) {
      this.couponService.validateCoupon(this.couponCode).subscribe(
        (coupon: Coupon) => {
          this.calculateCouponDiscount(coupon);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
        },
      );
    }
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  checkout() {
    this.ref.close({ status: true });
  }
}
