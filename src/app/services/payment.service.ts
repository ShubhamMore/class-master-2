import { HttpService } from './shared-services/http.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentDetails = {
    amount: '99',
    planType: null,
  };

  constructor(private httpService: HttpService) {}

  getPaymentDetails() {
    return this.paymentDetails;
  }

  setPaymentDetails(amount: string, planType: string) {
    this.paymentDetails.amount = amount;
    this.paymentDetails.planType = planType;
  }

  deleteOrder(id: string) {
    const data = { api: 'deleteOrder', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  generateOrder(order: any) {
    const data = { api: 'generateOrder', data: order };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  verifyPayment(payment: any, placedOrder: any) {
    const data = {
      api: 'verifyPayment',
      data: {
        payment,
        receipt: placedOrder,
      },
    };
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
