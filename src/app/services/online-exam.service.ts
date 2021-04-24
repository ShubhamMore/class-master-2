import { OnlineExamModel } from '../models/online-exam.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineExamService {
  private onlineExamId: string;

  private onlineExam = new BehaviorSubject<OnlineExamModel>(null);

  private date: string = null;

  getSearchDate() {
    return this.date;
  }

  setSearchDate(date: string) {
    this.date = date;
  }

  setOnlineExamData(onlineExam: OnlineExamModel) {
    this.onlineExam.next(onlineExam);
  }

  getOnlineExamData() {
    return this.onlineExam;
  }

  deleteOnlineExamData() {
    this.onlineExam.next(null);
  }

  setOnlineExamId(onlineExamId: string) {
    this.onlineExamId = onlineExamId;
  }

  getOnlineExamId() {
    return this.onlineExamId;
  }

  deleteOnlineExamId() {
    this.onlineExamId = null;
  }

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

  getOnlineExams(
    branch: string,
    category: string,
    course: string,
    batch: string,
    subject: string,
    month: string,
    year: string,
  ) {
    const data = {
      api: 'getOnlineExams',
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

  getOnlineExamsForStudent(
    branch: string,
    category: string,
    course: string,
    batch: string,
    subject: string,
    month: string,
    year: string,
  ) {
    const data = {
      api: 'getOnlineExamsForStudent',
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

  saveOnlineExamResult(studentQuestionAnswers: any, onlineExam: string) {
    const data = { api: 'saveOnlineExamResult', data: { studentQuestionAnswers, onlineExam } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getOnlineExamResult(id: string) {
    const data = { api: 'getOnlineExamResult', data: { id } };
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
