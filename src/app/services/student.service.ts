import { StudentCourseModel } from './../models/student-course.model';
import { StudentModel } from '../models/student.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private student: StudentModel;

  private studentSearchData = {
    branch: '',
    category: '',
    course: '',
    batch: '',
  };

  setStudentData(student: StudentModel) {
    this.student = student;
  }

  getStudentData() {
    return this.student;
  }

  setBranch(branch: string) {
    this.studentSearchData.branch = branch;
  }
  getBranch() {
    return this.studentSearchData.branch;
  }

  setCategory(category: string) {
    this.studentSearchData.category = category;
  }
  getCategory() {
    return this.studentSearchData.category;
  }

  setCourse(course: string) {
    this.studentSearchData.course = course;
  }
  getCourse() {
    return this.studentSearchData.course;
  }

  setBatch(batch: string) {
    this.studentSearchData.batch = batch;
  }
  getBatch() {
    return this.studentSearchData.batch;
  }

  constructor(private httpService: HttpService) {}

  getStudentsByBranch(searchData: any) {
    const data = { api: 'getStudents', data: searchData };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudent(id: string) {
    const data = { api: 'getStudent', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBStudentOfCourseForPayment(student: string, branch: string, category: string, course: string) {
    const data = {
      api: 'getBStudentOfCourseForPayment',
      data: { student, branch, category, course },
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

  changeStudentCourseStatus(
    student: string,
    branch: string,
    category: string,
    course: string,
    status: boolean,
  ) {
    const data = {
      api: 'changeStudentStatus',
      data: { student, branch, category, course, status },
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

  changeStudentStatus(student: string, status: boolean) {
    const data = { api: 'changeStudentStatus', data: { student, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentCourseForEditing(student: string, branch: string, category: string, course: string) {
    const data = { api: 'getStudentForEditing', data: { student, branch, category, course } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentForEditing(id: string) {
    const data = { api: 'getStudentForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudentProfile(id: string) {
    const data = { api: 'getStudentProfile', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addStudent(student: any) {
    const data = { api: 'newStudent', data: student };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addStudentCourse(studentCourse: any) {
    const data = { api: 'addStudentCourse', data: studentCourse };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editStudent(student: any) {
    const data = { api: 'editStudent', data: student };
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
    const data = { api: 'editStudentCourse', data: studentCourse };
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
