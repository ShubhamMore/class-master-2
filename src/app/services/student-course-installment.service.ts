import {
  StudentCourseInstallmentModel,
  InstallmentModel,
} from './../models/student-course-installment.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError, take } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentCourseInstallmentService {
  private courseInstallmentId: string;
  private studentCourseInstallmentId: string;
  private studentCourseInstallments = new BehaviorSubject<StudentCourseInstallmentModel>(null);

  setStudentCourseInstallmentData(studentCourseInstallments: StudentCourseInstallmentModel) {
    this.studentCourseInstallments.next(studentCourseInstallments);
  }

  getStudentCourseInstallmentData() {
    return this.studentCourseInstallments;
  }

  deleteStudentCourseInstallmentData() {
    this.studentCourseInstallments.next(null);
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

  setCourseInstallmentId(courseInstallmentId: string) {
    this.courseInstallmentId = courseInstallmentId;
  }

  getCourseInstallmentId() {
    return this.courseInstallmentId;
  }

  deleteCourseInstallmentId() {
    this.courseInstallmentId = null;
  }

  setCourseInstallmentReceipt(installmentId: string, receiptId: string) {
    this.studentCourseInstallments.subscribe(
      (studentCourseInstallment: StudentCourseInstallmentModel) => {
        if (studentCourseInstallment) {
          const i = studentCourseInstallment.installments.findIndex(
            (curInstallment: InstallmentModel) => curInstallment._id === installmentId,
          );
          if (i >= 0) {
            if (receiptId) {
              studentCourseInstallment.amountCollected =
                studentCourseInstallment.amountCollected +
                studentCourseInstallment.installments[i].installmentAmount;
            } else {
              studentCourseInstallment.amountCollected =
                studentCourseInstallment.amountCollected -
                studentCourseInstallment.installments[i].installmentAmount;
            }
            studentCourseInstallment.pendingAmount =
              studentCourseInstallment.totalAmount - studentCourseInstallment.amountCollected;
            studentCourseInstallment.installments[i].receiptId = receiptId;
          }
        }
      },
    );
  }

  getCourseInstallment(installmentId: string): Observable<InstallmentModel> {
    return this.studentCourseInstallments.pipe(
      map((studentCourseInstallment: StudentCourseInstallmentModel) => {
        if (studentCourseInstallment) {
          const installment = studentCourseInstallment.installments.find(
            (curInstallment: InstallmentModel) => curInstallment._id === installmentId,
          );
          return installment;
        }
        return null;
      }),
    );
  }

  constructor(private httpService: HttpService) {}

  addStudentCourseInstallment(studentCourse: string, studentCourseInstallment: any) {
    const data = {
      api: 'newStudentCourseInstallment',
      data: { studentCourse, studentCourseInstallment },
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
