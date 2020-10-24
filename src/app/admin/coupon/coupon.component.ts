import { DateService } from './../../services/shared-services/date.service';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { CouponModel } from './../../models/coupon.model';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { CouponService } from './../../services/coupon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit {
  loading: boolean;

  coupons: CouponModel[];

  constructor(
    private couponService: CouponService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.coupons = [];

    this.couponService.getCoupons().subscribe(
      (coupons: CouponModel[]) => {
        this.coupons = coupons;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  updateCoupon(coupon: { coupon: CouponModel; type: string }) {
    if (coupon.type === 'add') {
      this.coupons.push(coupon.coupon);
      this.showToastr('top-right', 'success', 'Coupon Added Successfully');
    } else {
      const index = this.coupons.findIndex(
        (curCoupon: CouponModel) => curCoupon._id === coupon.coupon._id,
      );

      if (index >= 0) {
        this.coupons[index] = coupon.coupon;
        this.showToastr('top-right', 'success', 'Coupon Updated Successfully');
      }
    }
  }

  openCouponDialog() {
    this.dialogService
      .open(AddCouponComponent, {
        context: {},
      })
      .onClose.subscribe(
        (coupon: { coupon: CouponModel; type: string }) => coupon && this.updateCoupon(coupon),
      );
  }

  addCoupon() {
    this.openCouponDialog();
  }

  editCoupon(coupon: CouponModel) {
    this.couponService.setCouponData(coupon);
    this.openCouponDialog();
  }

  deleteCoupon(id: string) {
    this.loading = true;
    this.couponService.deleteCoupon(id).subscribe(
      (res: any) => {
        const index = this.coupons.findIndex((coupon: CouponModel) => coupon._id === id);
        if (index >= 0) {
          this.coupons.splice(index, 1);
          this.showToastr('top-right', 'success', 'Coupon Deleted Successfully');
        }
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
