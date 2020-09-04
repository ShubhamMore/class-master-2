import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { StudentModel } from '../models/Student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private studentType: string;
  private studentId: string;
  private student = new BehaviorSubject<StudentModel>(null);

  setStudentType(type: string) {
    this.studentType = type;
  }

  getStudentType() {
    return this.studentType;
  }

  deleteStudentType() {
    this.studentType = null;
  }

  setStudentData(student: StudentModel) {
    this.student.next(student);
  }

  getStudentData() {
    return this.student;
  }

  deleteStudentData() {
    this.student.next(null);
  }

  setStudentId(studentId: string) {
    this.studentId = studentId;
  }

  getStudentId() {
    return this.studentId;
  }

  deleteStudentId() {
    this.studentId = null;
  }

  getStudentName() {
    return this.getStudentData().pipe(
      map((student: StudentModel) => {
        if (student) {
          return student.name;
        }
        return '--';
      }),
    );
  }

  constructor(private httpService: HttpService) {}

  addStudent(student: any, branchStudent: any) {
    const data = { api: 'newStudent', data: { student, branchStudent } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStudents() {
    const data = { api: 'getStudents', data: {} };
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

  getStudentByImsId(studentImsId: string) {
    const data = { api: 'getStudentByImsId', data: { studentImsId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  searchStudent(studentId: string) {
    const data = { api: 'searchStudent', data: { studentId } };
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

  changeStudentStatus(id: string, status: boolean) {
    const data = { api: 'changeStudentStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editStudent(student: StudentModel) {
    const data = { api: 'updateStudent', data: student };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteStudent(id: string) {
    const data = { api: 'deleteStudent', data: { id } };
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
