import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { SMSPackageModel } from '../models/sms-package.model';

@Injectable({
  providedIn: 'root',
})
export class SMSPackageService {
  private smsPackage = new BehaviorSubject<SMSPackageModel>(null);
  private smsPackageId: string;

  setSMSPackageData(SMSPackage: SMSPackageModel) {
    this.smsPackage.next(SMSPackage);
  }

  getSMSPackageData() {
    return this.smsPackage;
  }

  deleteSMSPackageData() {
    this.smsPackage.next(null);
  }

  setSMSPackageId(smsPackageId: string) {
    this.smsPackageId = smsPackageId;
  }

  getSMSPackageId() {
    return this.smsPackageId;
  }

  deleteSMSPackageId() {
    this.smsPackageId = null;
  }
  constructor(private httpService: HttpService) {}

  saveSMSPackage(smsPackage: any) {
    const data = { api: 'newSMSPackage', data: smsPackage };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeSMSPackageStatus(id: string, status: boolean) {
    const data = { api: 'changeSMSPackageStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getSMSPackages() {
    const data = {
      api: 'getSMSPackages',
      data: {},
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

  getSMSPackage(id: string) {
    const data = { api: 'getSMSPackage', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editSMSPackage(smsPackage: SMSPackageModel) {
    const data = { api: 'updateSMSPackage', data: smsPackage };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteSMSPackage(id: string) {
    const data = { api: 'deleteSMSPackage', data: { id } };
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
