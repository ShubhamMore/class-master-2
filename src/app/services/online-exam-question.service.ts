import { OnlineExamQuestionModel } from '../models/online-exam-question.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineExamQuestionService {
  private onlineExamQuestionId: string;

  private onlineExamQuestion = new BehaviorSubject<OnlineExamQuestionModel>(null);

  setOnlineExamQuestionData(onlineExamQuestion: OnlineExamQuestionModel) {
    this.onlineExamQuestion.next(onlineExamQuestion);
  }

  getOnlineExamQuestionData() {
    return this.onlineExamQuestion;
  }

  deleteOnlineExamQuestionData() {
    this.onlineExamQuestion.next(null);
  }

  setOnlineExamQuestionId(onlineExamQuestionId: string) {
    this.onlineExamQuestionId = onlineExamQuestionId;
  }

  getOnlineExamQuestionId() {
    return this.onlineExamQuestionId;
  }

  deleteOnlineExamQuestionId() {
    this.onlineExamQuestionId = null;
  }

  constructor(private httpService: HttpService) {}

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

  getOnlineExamQuestionsForStudent(id: string) {
    const data = { api: 'getOnlineExamQuestionsForStudent', data: { id } };
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
