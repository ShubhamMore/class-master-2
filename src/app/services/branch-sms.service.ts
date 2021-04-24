import { BranchSMSModel } from '../models/branch-sms.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchSMSService {
  branchSMS = new BehaviorSubject<BranchSMSModel>(null);

  setBranchSMSDetails(branchSMS: BranchSMSModel) {
    this.branchSMS.next(branchSMS);
  }

  getBranchSMSDetails() {
    return this.branchSMS;
  }

  deleteBranchSMSDetails() {
    this.branchSMS.next(null);
  }

  constructor(private httpService: HttpService) {}

  getBranchSMS(branch: any) {
    const data = { api: 'getBranchSMS', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  updateBranchSMS(branch: string, smsPackage: string, order: string, receipt: string) {
    const data = { api: 'updateBranchSMS', data: { branch, smsPackage, order, receipt } };
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
