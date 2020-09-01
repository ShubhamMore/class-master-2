import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { ExamModel } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private examId: string;

  private exam = new BehaviorSubject<ExamModel>(null);

  setExamData(exam: ExamModel) {
    this.exam.next(exam);
  }

  getExamData() {
    return this.exam;
  }

  deleteExamData() {
    this.exam.next(null);
  }

  setExamId(examId: string) {
    this.examId = examId;
  }

  getExamId() {
    return this.examId;
  }

  deleteExamId() {
    this.examId = null;
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
    subject: string,
    month: string,
    year: string,
  ) {
    const data = {
      api: 'getExams',
      data: { branch, category, course, batch, subject, month, year },
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

  editExam(exam: ExamModel) {
    const data = { api: 'editExam', data: exam };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  saveStudentsMarks(id: string, marks: any) {
    const data = { api: 'saveStudentsMarks', data: { id, marks } };
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
