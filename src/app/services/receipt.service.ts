import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';
import { ReceiptModel } from '../models/receipt.model';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  receipt: ReceiptModel;

  constructor(private httpService: HttpService) {}

  addReceipt(receipt: any) {
    const data = { api: 'newReceipt', data: receipt };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeReceiptStatus(id: string, status: boolean) {
    const data = { api: 'changeReceiptStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAllReceipts(student: string) {
    const data = { api: 'getAllReceipts', data: { student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAllReceiptsForStudent(student: string) {
    const data = { api: 'getAllReceiptsForStudent', data: { student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getReceipt(receipt: string) {
    const data = { api: 'getReceipt', data: { receipt } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getReceiptForEditing(receipt: string) {
    const data = { api: 'getReceiptForEditing', data: { receipt } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editReceipt(receipt: string) {
    const data = { api: 'editReceipt', data: { receipt } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteReceipt(receipt: string) {
    const data = { api: 'deleteReceipt', data: { receipt } };
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
