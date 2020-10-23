import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { StudentCourseInstallmentReceiptModel } from '../models/student-course-installment-receipt.model';

@Injectable({
  providedIn: 'root',
})
export class StudentCourseInstallmentReceiptService {
  private studentCourseInstallmentReceiptId: string;
  private studentCourseInstallmentReceipt = new BehaviorSubject<
    StudentCourseInstallmentReceiptModel
  >(null);

  setStudentCourseInstallmentReceiptData(
    studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel,
  ) {
    this.studentCourseInstallmentReceipt.next(studentCourseInstallmentReceipt);
  }

  getStudentCourseInstallmentReceiptData() {
    return this.studentCourseInstallmentReceipt;
  }

  deleteStudentCourseInstallmentReceiptData() {
    this.studentCourseInstallmentReceipt.next(null);
  }

  setStudentCourseInstallmentReceiptId(studentCourseInstallmentReceiptId: string) {
    this.studentCourseInstallmentReceiptId = studentCourseInstallmentReceiptId;
  }

  getStudentCourseInstallmentReceiptId() {
    return this.studentCourseInstallmentReceiptId;
  }

  deleteStudentCourseInstallmentReceiptId() {
    this.studentCourseInstallmentReceiptId = null;
  }

  constructor(private httpService: HttpService) {}

  addStudentCourseInstallmentReceipt(studentCourseInstallmentReceipt: any) {
    const data = {
      api: 'newStudentCourseInstallmentReceipt',
      data: studentCourseInstallmentReceipt,
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

  generateStudentCourseInstallmentReceipt(order: string, receipt: string) {
    const data = {
      api: 'generateStudentCourseInstallmentReceipt',
      data: {
        order,
        receipt,
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

  changeStudentCourseInstallmentReceiptStatus(id: string, status: boolean) {
    const data = { api: 'changeStudentCourseInstallmentReceiptStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAllStudentCourseInstallmentReceipts(student: string) {
    const data = { api: 'getAllStudentCourseInstallmentReceipts', data: { student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentAllCourseInstallmentReceiptsForStudent(student: string) {
    const data = { api: 'getStudentAllCourseInstallmentReceiptsForStudent', data: { student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourseInstallmentReceipt(id: string) {
    const data = {
      api: 'getStudentCourseInstallmentReceipt',
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

  getStudentCourseInstallmentReceiptForEditing(id: string) {
    const data = {
      api: 'getStudentCourseInstallmentReceiptForEditing',
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

  editStudentCourseInstallmentReceipt(studentCourseInstallmentReceipt: string) {
    const data = {
      api: 'editStudentCourseInstallmentReceipt',
      data: studentCourseInstallmentReceipt,
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

  deleteStudentCourseInstallmentReceipt(id: string) {
    const data = {
      api: 'deleteStudentCourseInstallmentReceipt',
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
}
