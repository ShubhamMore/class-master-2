import { StudentCourseInstallmentModel } from '../models/student-course-installment.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { StudentCourseModel } from '../models/student-course.model';

@Injectable({ providedIn: 'root' })
export class StudentCourseService {
  private studentCourseId: string;
  private studentCourse = new BehaviorSubject<StudentCourseModel>(null);

  setStudentCourseData(studentCourse: StudentCourseModel) {
    this.studentCourse.next(studentCourse);
  }

  getStudentCourseData() {
    return this.studentCourse;
  }

  deleteStudentCourseData() {
    this.studentCourse.next(null);
  }

  setStudentCourseId(studentCourseId: string) {
    this.studentCourseId = studentCourseId;
  }

  getStudentCourseId() {
    return this.studentCourseId;
  }

  deleteStudentCourseId() {
    this.studentCourseId = null;
  }

  constructor(private httpService: HttpService) {}

  addStudentCourse(studentCourse: any, studentCourseInstallment: any) {
    const data = { api: 'newStudentCourse', data: { studentCourse, studentCourseInstallment } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourses(branch: string, category: string, student: string) {
    const data = { api: 'getStudentCourses', data: { branch, category, student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentAllCourses(branch: string) {
    const data = { api: 'getStudentAllCourses', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourse(id: string) {
    const data = { api: 'getStudentCourse', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  checkBatchRollNumber(
    branch: string,
    category: string,
    course: string,
    batch: string,
    rollNumber: number,
  ) {
    const data = {
      api: 'checkBatchRollNumber',
      data: { branch, category, course, batch, rollNumber },
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

  getStudentCourseForEditing(id: string) {
    const data = { api: 'getStudentCourseForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeStudentCourseStatus(id: string, status: boolean) {
    const data = { api: 'changeStudentCourseStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editStudentCourse(
    studentCourse: StudentCourseModel,
    studentCourseInstallment: StudentCourseInstallmentModel,
  ) {
    const data = { api: 'updateStudentCourse', data: { studentCourse, studentCourseInstallment } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteStudentCourse(id: string) {
    const data = { api: 'deleteStudentCourse', data: { id } };
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
