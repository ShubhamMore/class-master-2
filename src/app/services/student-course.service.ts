import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StudentCourseModel } from '../models/student-course.model';

@Injectable({ providedIn: 'root' })
export class StudentCourseService {
  private studentCourseId: string;
  private studentCourse: StudentCourseModel;

  setStudentCourseData(studentCourse: StudentCourseModel) {
    this.studentCourse = studentCourse;
  }

  getStudentCourseData() {
    return this.studentCourse;
  }

  deleteStudentCourseData() {
    this.studentCourse = null;
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

  addStudentCourse(studentCourse: any, branchStudentCourse: any) {
    const data = { api: 'newStudentCourse', data: { studentCourse, branchStudentCourse } };
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

  editStudentCourse(studentCourse: StudentCourseModel) {
    const data = { api: 'updateStudentCourse', data: studentCourse };
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
