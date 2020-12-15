import { StudentTransactionModel } from './../models/student-transaction.model';
import { InstituteTransactionModel } from './../models/institute-transaction.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private instituteTransaction = new BehaviorSubject<InstituteTransactionModel>(null);

  private studentTransaction = new BehaviorSubject<StudentTransactionModel>(null);

  setInstituteTransactionData(instituteTransaction: InstituteTransactionModel) {
    this.instituteTransaction.next(instituteTransaction);
  }

  getInstituteTransactionData() {
    return this.instituteTransaction;
  }

  deleteInstituteTransactionData() {
    this.instituteTransaction.next(null);
  }

  setStudentTransactionData(studentTransaction: StudentTransactionModel) {
    this.studentTransaction.next(studentTransaction);
  }

  getStudentTransactionData() {
    return this.studentTransaction;
  }

  deleteStudentTransactionData() {
    this.studentTransaction.next(null);
  }

  constructor(private httpService: HttpService) {}

  getTransactionHistory() {
    const data = {
      api: 'getTransactionHistory',
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

  getInstituteTransaction(id: string) {
    const data = {
      api: 'getInstituteTransaction',
      data: { id },
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

  getInstituteTransactions() {
    const data = {
      api: 'getInstituteTransactions',
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

  getStudentTransaction(id: string) {
    const data = {
      api: 'getStudentTransaction',
      data: { id },
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

  getStudentTransactions() {
    const data = {
      api: 'getStudentTransactions',
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
}
