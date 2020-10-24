import { CouponModel } from '../models/coupon.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CouponService {
  private discountTypes: string[] = ['percentage', 'amount'];

  private coupons = new BehaviorSubject<CouponModel[]>([]);
  private coupon = new BehaviorSubject<CouponModel>(null);
  private couponId: string;

  getDiscountTypes() {
    return this.discountTypes;
  }

  setCouponId(couponId: string) {
    this.couponId = couponId;
  }

  getCouponId() {
    return this.couponId;
  }

  deleteCouponId() {
    this.couponId = null;
  }

  setCouponsData(coupons: CouponModel[]) {
    this.coupons.next(coupons);
  }

  getCouponsData() {
    return this.coupons;
  }

  deleteCouponsData() {
    this.coupons.next([]);
  }

  setCouponData(coupon: CouponModel) {
    this.coupon.next(coupon);
  }

  getCouponData() {
    return this.coupon;
  }

  deleteCouponData() {
    this.coupon.next(null);
  }

  constructor(private httpService: HttpService) {}

  getCoupons() {
    const data = { api: 'getCoupons', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getCoupon(id: string) {
    const data = { api: 'getCoupon', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getCouponForEditing(id: string) {
    const data = { api: 'getCouponForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addCoupon(coupon: any) {
    const data = { api: 'newCoupon', data: coupon };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editCoupon(coupon: any) {
    const data = { api: 'updateCoupon', data: coupon };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteCoupon(id: string) {
    const data = { api: 'deleteCoupon', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeCouponStatus(id: string, status: boolean) {
    const data = { api: 'changeCouponStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  checkCoupon(code: string) {
    const data = { api: 'checkCoupon', data: { code } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  validateCoupon(code: string) {
    const data = { api: 'validateCoupon', data: { code } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }
}
