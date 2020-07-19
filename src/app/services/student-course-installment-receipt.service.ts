import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';
import { StudentCourseInstallmentReceiptModel } from '../models/student-course-installment-receipt.model';

@Injectable({
  providedIn: 'root',
})
export class StudentCourseInstallmentReceiptService {
  private studentCourseInstallmentReceiptId: string;
  private studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel;

  setStudentCourseInstallmentReceiptData(
    studentCourseInstallmentReceipt: StudentCourseInstallmentReceiptModel,
  ) {
    this.studentCourseInstallmentReceipt = studentCourseInstallmentReceipt;
  }

  getStudentCourseInstallmentReceiptData() {
    return this.studentCourseInstallmentReceipt;
  }

  deleteStudentCourseInstallmentReceiptData() {
    this.studentCourseInstallmentReceipt = null;
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

  getAllStudentCourseInstallmentReceiptsForStudent(student: string) {
    const data = { api: 'getAllStudentCourseInstallmentReceiptsForStudent', data: { student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourseInstallmentReceipt(studentCourseInstallmentReceipt: string) {
    const data = {
      api: 'getStudentCourseInstallmentReceipt',
      data: { studentCourseInstallmentReceipt },
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

  getStudentCourseInstallmentReceiptForEditing(studentCourseInstallmentReceipt: string) {
    const data = {
      api: 'getStudentCourseInstallmentReceiptForEditing',
      data: { studentCourseInstallmentReceipt },
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
      data: { studentCourseInstallmentReceipt },
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

  deleteStudentCourseInstallmentReceipt(studentCourseInstallmentReceipt: string) {
    const data = {
      api: 'deleteStudentCourseInstallmentReceipt',
      data: { studentCourseInstallmentReceipt },
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
