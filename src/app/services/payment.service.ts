import { HttpService } from './shared-services/http.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentDetails: { planType: string; packageType: string; amount: string };
  private institutePaymentDetails: { planType: string; packageType: string; amount: string };

  getPaymentDetails() {
    return this.paymentDetails;
  }

  setPaymentDetails(planType: string, packageType: string, amount: string) {
    this.paymentDetails = { planType, packageType, amount };
  }

  deletePaymentDetails() {
    this.paymentDetails = null;
  }

  getInstitutePaymentDetails() {
    return this.institutePaymentDetails;
  }

  setInstitutePaymentDetails(planType: string, packageType: string, amount: string) {
    this.institutePaymentDetails = { planType, packageType, amount };
  }

  deleteInstitutePaymentDetails() {
    this.institutePaymentDetails = null;
  }

  constructor(private httpService: HttpService) {}

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

  verifyInstitutePayment(payment: any, placedOrder: any) {
    const data = {
      api: 'verifyInstitutePayment',
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
