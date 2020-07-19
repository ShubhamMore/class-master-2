import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StudentCourseInstallmentModel } from '../models/student-course-installment.model';

@Injectable({ providedIn: 'root' })
export class StudentCourseInstallmentService {
  private studentCourseInstallmentId: string;
  private studentCourseInstallment: StudentCourseInstallmentModel;

  setStudentCourseInstallmentData(studentCourseInstallment: StudentCourseInstallmentModel) {
    this.studentCourseInstallment = studentCourseInstallment;
  }

  getStudentCourseInstallmentData() {
    return this.studentCourseInstallment;
  }

  deleteStudentCourseInstallmentData() {
    this.studentCourseInstallment = null;
  }

  setStudentCourseInstallmentId(studentCourseInstallmentId: string) {
    this.studentCourseInstallmentId = studentCourseInstallmentId;
  }

  getStudentCourseInstallmentId() {
    return this.studentCourseInstallmentId;
  }

  deleteStudentCourseInstallmentId() {
    this.studentCourseInstallmentId = null;
  }

  constructor(private httpService: HttpService) {}

  addStudentCourseInstallment(studentCourseInstallment: any, branchStudentCourseInstallment: any) {
    const data = {
      api: 'newStudentCourseInstallment',
      data: { studentCourseInstallment, branchStudentCourseInstallment },
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

  getStudentCourseInstallments(student: string) {
    const data = { api: 'getStudentCourseInstallments', data: { student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourseInstallment(id: string) {
    const data = { api: 'getStudentCourseInstallment', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourseInstallmentForEditing(id: string) {
    const data = { api: 'getStudentCourseInstallmentForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeStudentCourseInstallmentStatus(id: string, status: boolean) {
    const data = { api: 'changeStudentCourseInstallmentStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editStudentCourseInstallment(studentCourseInstallment: StudentCourseInstallmentModel) {
    const data = { api: 'updateStudentCourseInstallment', data: studentCourseInstallment };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteStudentCourseInstallment(id: string) {
    const data = { api: 'deleteStudentCourseInstallment', data: { id } };
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
