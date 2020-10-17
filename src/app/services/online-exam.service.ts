import { OnlineExamModel } from './../models/online-exam.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineExamService {
  onlineExam: OnlineExamModel;

  constructor(private httpService: HttpService) {}

  getOnlineExam(id: string) {
    const data = { api: 'getOnlineExam', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExamForEditing(id: string) {
    const data = { api: 'getOnlineExamForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExams(branch: string, category: any, course: string, batch: string, subject: string) {
    const data = { api: 'getOnlineExams', data: { branch, category, course, batch, subject } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExamsForStudent(
    branch: string,
    category: string,
    course: string,
    batch: string,
    date: string,
  ) {
    const data = {
      api: 'getOnlineExamsForStudent',
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

  addOnlineExam(onlineExam: any) {
    const data = { api: 'newOnlineExam', data: onlineExam };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editOnlineExam(onlineExam: OnlineExamModel) {
    const data = { api: 'editOnlineExam', data: onlineExam };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeOnlineExamStatus(id: string, status: boolean) {
    const data = { api: 'changeOnlineExamStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteOnlineExam(id: string) {
    const data = { api: 'deleteOnlineExam', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  saveOnlineExamResult(onlineExamResult: any) {
    const data = { api: 'saveOnlineExamResult', data: onlineExamResult };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExamResult(id: string, student: string) {
    const data = { api: 'getOnlineExamResult', data: { id, student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  /*********** ONLINE EXAM QUESTION ***********/

  newOnlineExamQuestion(contents: FormData) {
    const data = { api: 'newOnlineExamQuestion', data: contents };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExamQuestion(id: string) {
    const data = { api: 'getOnlineExamQuestion', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExamQuestions(id: string) {
    const data = { api: 'getOnlineExamQuestions', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExamQuestionsForStudent(id: string, student: string) {
    const data = { api: 'getOnlineExamQuestionsForStudent', data: { id, student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeOnlineExamQuestionStatus(id: string, status: boolean) {
    const data = { api: 'changeOnlineExamQuestionStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editOnlineExamQuestion(question: any) {
    const data = { api: 'editOnlineExamQuestion', data: question };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteOnlineExamQuestion(id: string) {
    const data = { api: 'deleteOnlineExamQuestion', data: { id } };
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
