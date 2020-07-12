import { InstituteBillingModel } from './../models/institute-billing.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteBillingService {
  billingDetails: InstituteBillingModel;

  setBilling(billingDetails: any) {
    this.billingDetails = billingDetails;
  }

  getBilling() {
    return this.billingDetails;
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

  getBillingDetails(classMasterId: string) {
    const data = { api: 'getBillingDetails', data: { classMasterId } };
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
