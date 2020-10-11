import { LectureQuestionModel } from '../models/lecture-question.model';
import { HttpService } from './shared-services/http.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionAnswersService {
  private questionAnswers = new BehaviorSubject<LectureQuestionModel>(null);
  private questionAnswersId: string = null;

  setQuestionAnswersData(questionAnswers: LectureQuestionModel) {
    this.questionAnswers.next(questionAnswers);
  }

  getQuestionAnswersData() {
    return this.questionAnswers;
  }

  deleteQuestionAnswersData() {
    this.questionAnswers.next(null);
  }

  setQuestionAnswersId(questionAnswersId: string) {
    this.questionAnswersId = questionAnswersId;
  }

  getQuestionAnswersId() {
    return this.questionAnswersId;
  }

  deleteQuestionAnswersId() {
    this.questionAnswersId = null;
  }

  constructor(private httpService: HttpService) {}

  getLectureQuestionAnswers(
    branch: string,
    category: string,
    course: string,
    batch: string,
    lecture: string,
  ) {
    const data = {
      api: 'getLectureQuestionAnswers',
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

  getLectureQuestionAnswer(id: string) {
    const data = { api: 'getLectureQuestionAnswer', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  newLectureQuestion(question: any) {
    const data = { api: 'newLectureQuestion', data: question };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editLectureQuestion(question: any) {
    const data = { api: 'editLectureQuestion', data: question };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteLectureQuestion(id: string) {
    const data = { api: 'deleteLectureQuestion', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  newLectureQuestionAnswer(answer: any) {
    const data = { api: 'newLectureQuestionAnswer', data: answer };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editLectureQuestionAnswer(answer: any) {
    const data = { api: 'editLectureQuestionAnswer', data: answer };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteLectureQuestionAnswer(id: string) {
    const data = { api: 'deleteLectureQuestionAnswer', data: { id } };
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
