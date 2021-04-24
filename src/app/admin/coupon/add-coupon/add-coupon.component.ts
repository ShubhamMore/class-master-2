import { DateService } from './../../../services/shared-services/date.service';
import { CouponService } from './../../../services/coupon.service';
import { CouponModel } from '../../../models/coupon.model';
import { NbDialogRef, NbToastrService, NbStepperComponent } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
})
export class AddCouponComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  private branchId: string;
  private couponId: string;

  coupon: CouponModel;
  couponForm: FormGroup;

  validCouponCode: boolean;

  discountTypes: string[];
  constructor(
    public dateService: DateService,
    private couponService: CouponService,
    private toastrService: NbToastrService,

    protected ref: NbDialogRef<AddCouponComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.discountTypes = this.couponService.getDiscountTypes();

    this.validCouponCode = true;

    this.couponService.getCouponData().subscribe((coupon: CouponModel) => {
      this.coupon = coupon;

      this.couponForm = new FormGroup(
        {
          code: new FormControl(coupon ? coupon.code : null, {
            validators: [Validators.required],
          }),
          discountType: new FormControl(coupon ? coupon.discountType : this.discountTypes[0], {
            validators: [Validators.required],
          }),
          discountAmount: new FormControl(coupon ? coupon.discountAmount : null, {
            validators: [Validators.required, Validators.min(0)],
          }),
          expiryDate: new FormControl(coupon ? coupon.expiryDate : null, {
            validators: [],
          }),
          description: new FormControl(coupon ? coupon.description : null, {
            validators: [],
          }),
          termsAndConditions: new FormControl(coupon ? coupon.termsAndConditions : null, {
            validators: [],
          }),
        },
        {
          validators: this.discountPercentageValidator.bind(this),
        },
      );

      this.loading = false;
    });
  }

  discountPercentageValidator(group: FormGroup): { [s: string]: boolean } {
    const discountType = group.value.discountType;
    const amount = +group.value.discountAmount;
    if (discountType === 'percentage' && amount > 100) {
      return { invalidDiscountPercentage: true };
    }
    return null;
  }

  checkCouponCode(code: any) {
    if (this.coupon && this.coupon.code === code) {
      this.validCouponCode = true;
      return;
    }
    this.couponService.checkCoupon(code).subscribe(
      (res: any) => {
        this.validCouponCode = res.status;
      },
      (err: any) => {},
    );
  }

  submitCoupon() {
    this.couponForm.markAllAsTouched();
    if (this.couponForm.invalid) {
      this.showToastr('top-right', 'danger', 'Coupon Details are required');
      return;
    } else if (!this.validCouponCode) {
      this.showToastr('top-right', 'danger', 'This Coupon Code Already Exist');
      return;
    }
    this.stepper.next();
  }

  saveCoupon() {
    this.couponForm.markAllAsTouched();

    if (this.couponForm.invalid) {
      this.showToastr('top-right', 'danger', 'Coupon Details are required');
      return;
    } else if (!this.validCouponCode) {
      this.showToastr('top-right', 'danger', 'This Coupon Code Already Exist');
      return;
    }
    this.submit = true;

    const coupon: any = { ...this.couponForm.value };

    if (!this.coupon) {
      this.couponService.addCoupon(coupon).subscribe(
        (resCoupon: CouponModel) => {
          this.ref.close({ coupon: resCoupon, type: 'add' });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      coupon._id = this.coupon._id;

      this.couponService.editCoupon(coupon).subscribe(
        (res: any) => {
          this.ref.close({ coupon: coupon, type: 'edit' });
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
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
    this.couponService.deleteCouponData();
  }
}
