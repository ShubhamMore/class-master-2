import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ExamModel } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  exam: ExamModel;

  private examSearchData: any = {
    branch: '',
    category: '',
    course: '',
    batch: '',
    subject: '',
    month: null,
    year: null,
  };

  setBranch(branch: string) {
    this.examSearchData.branch = branch;
  }
  getBranch() {
    return this.examSearchData.branch;
  }

  setCategory(category: string) {
    this.examSearchData.category = category;
  }
  getCategory() {
    return this.examSearchData.category;
  }

  setCourse(course: string) {
    this.examSearchData.course = course;
  }
  getCourse() {
    return this.examSearchData.course;
  }

  setBatch(batch: string) {
    this.examSearchData.batch = batch;
  }
  getBatch() {
    return this.examSearchData.batch;
  }

  setSubject(subject: string) {
    this.examSearchData.subject = subject;
  }
  getSubject() {
    return this.examSearchData.subject;
  }

  setMonth(month: string) {
    this.examSearchData.month = month;
  }
  getMonth() {
    return this.examSearchData.month;
  }

  setYear(year: string) {
    this.examSearchData.year = year;
  }
  getYear() {
    return this.examSearchData.year;
  }

  constructor(private httpService: HttpService) {}

  getStudents(branch: any, category: any, course: string, batch: string) {
    const data = {
      api: 'getStudentsForExam',
      data: { branch, category, course, batch },
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

  saveExam(exam: any) {
    const data = { api: 'saveExam', data: exam };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getExams(
    branch: string,
    category: string,
    course: string,
    batch: string,
    month: string,
    year: string,
  ) {
    const data = { api: 'getExams', data: { branch, category, course, batch, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getExamsPerformance(
    month: string,
    year: string,
    branch: string,
    category: string,
    course: string,
    batch: string,
    subject: string,
    student: string,
  ) {
    const data = {
      api: 'getExamsPerformance',
      data: { month, year, branch, category, course, batch, subject, student },
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

  getExam(id: string) {
    const data = { api: 'getExam', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getExamReport(id: string) {
    const data = { api: 'getExamReport', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getExamForEditing(id: string) {
    const data = { api: 'getExamForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editExam(id: string, exam: ExamModel) {
    const data = { api: 'editExam', data: { id, exam } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteExam(id: string) {
    const data = { api: 'deleteExam', data: { id } };
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
