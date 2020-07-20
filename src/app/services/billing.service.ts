import { InstituteBillingModel } from './../models/institute-billing.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteBillingService {
  billingDetails = new BehaviorSubject<InstituteBillingModel>(null);

  setBilling(billingDetails: InstituteBillingModel) {
    this.billingDetails.next(billingDetails);
  }

  getBilling() {
    return this.billingDetails;
  }

  deleteBilling() {
    this.billingDetails.next(null);
  }

  constructor(private httpService: HttpService) {}

  saveBillingDetails(billingDetails: any) {
    const data = { api: 'saveBillingDetails', data: billingDetails };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBillingDetails(branch: string) {
    const data = { api: 'getBillingDetails', data: { branch } };
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
