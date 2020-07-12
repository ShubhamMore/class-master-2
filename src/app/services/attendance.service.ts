import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private attendanceSearchData: any = {
    date: null,
    branch: '',
    category: '',
    course: '',
    batch: '',
  };

  setDate(date: string) {
    this.attendanceSearchData.date = date;
  }

  getDate() {
    return this.attendanceSearchData.date;
  }

  setBranch(branch: string) {
    this.attendanceSearchData.branch = branch;
  }

  getBranch() {
    return this.attendanceSearchData.branch;
  }

  setCategory(category: string) {
    this.attendanceSearchData.category = category;
  }

  getCategory() {
    return this.attendanceSearchData.category;
  }

  setCourse(course: string) {
    this.attendanceSearchData.course = course;
  }

  getCourse() {
    return this.attendanceSearchData.course;
  }

  setBatch(batch: string) {
    this.attendanceSearchData.batch = batch;
  }

  getBatch() {
    return this.attendanceSearchData.batch;
  }

  constructor(private httpService: HttpService) {}

  getStudents(branch: string, category: string, course: string, batch: string, date: string) {
    const data = {
      api: 'getStudentsForAttendance',
      data: { branch, category, course, batch, date },
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
