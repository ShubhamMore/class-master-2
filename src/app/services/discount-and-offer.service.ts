import { DiscountAndOfferModel } from '../models/discount-and-offer.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscountAndOfferService {
  private discountTypes: string[] = ['percentage', 'amount'];

  private discountAndOffer: DiscountAndOfferModel;
  private discountAndOfferId: string;

  getDiscountTypes() {
    return this.discountTypes;
  }

  setDiscountAndOfferId(discountAndOfferId: string) {
    this.discountAndOfferId = discountAndOfferId;
  }

  getDiscountAndOfferId() {
    return this.discountAndOfferId;
  }

  deleteDiscountAndOfferId() {
    this.discountAndOfferId = null;
  }

  setDiscountAndOfferData(discountAndOffer: DiscountAndOfferModel) {
    this.discountAndOffer = discountAndOffer;
  }

  getDiscountAndOfferData() {
    return this.discountAndOffer;
  }

  deleteDiscountAndOfferData() {
    this.discountAndOffer = null;
  }

  constructor(private httpService: HttpService) {}

  getDiscountAndOffers(branch: any) {
    const data = { api: 'getDiscountAndOffers', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getDiscountAndOffersForStudent(branch: any) {
    const data = { api: 'getDiscountAndOffersForStudent', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getDiscountAndOffer(id: string) {
    const data = { api: 'getDiscountAndOffer', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getDiscountAndOfferForEditing(id: string) {
    const data = { api: 'getDiscountAndOfferForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  CheckDiscountAndOffer(branch: string, code: string) {
    const data = { api: 'CheckDiscountAndOffer', data: { branch, code } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addDiscountAndOffer(discountAndOffer: any) {
    const data = { api: 'newDiscountAndOffer', data: discountAndOffer };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editDiscountAndOffer(discountAndOffer: DiscountAndOfferModel) {
    const data = { api: 'updateDiscountAndOffer', data: discountAndOffer };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteDiscountAndOffer(id: string) {
    const data = { api: 'deleteDiscountAndOffer', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeDiscountAndOfferStatus(id: string, status: boolean) {
    const data = { api: 'changeDiscountAndOfferStatus', data: { id, status } };
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
