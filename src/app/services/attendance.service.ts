import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private httpService: HttpService) {}

  getStudents(branch: string, category: string, course: string, batch: string, lecture: string) {
    const data = {
      api: 'getStudentsForAttendance',
      data: { branch, category, course, batch, lecture },
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

  saveAttendance(attendance: any) {
    const data = { api: 'saveAttendance', data: attendance };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourseAttendance(
    subject: string,
    month: string,
    year: string,
    student: string,
    studentCourse: string,
  ) {
    const data = {
      api: 'getStudentCourseAttendance',
      data: { subject, month, year, student, studentCourse },
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

  getAttendance(
    month: string,
    year: string,
    branch: string,
    category: string,
    course: string,
    batch: string,
    student: string,
  ) {
    const data = {
      api: 'getAttendance',
      data: { month, year, branch, category, course, batch, student },
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
