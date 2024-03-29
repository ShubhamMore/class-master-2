import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { ScheduleModel } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class LectureService {
  private lecture = new BehaviorSubject<ScheduleModel>(null);
  private lectureId: string = null;
  private date: string = null;

  getSearchDate() {
    return this.date;
  }

  setSearchDate(date: string) {
    this.date = date;
  }

  setLectureData(lecture: ScheduleModel) {
    this.lecture.next(lecture);
  }

  getLectureData() {
    return this.lecture;
  }

  deleteLectureData() {
    this.lecture.next(null);
  }

  setLectureId(lectureId: string) {
    this.lectureId = lectureId;
  }

  getLectureId() {
    return this.lectureId;
  }

  deleteLectureId() {
    this.lectureId = null;
  }

  constructor(private httpService: HttpService) {}
  getLectures(branch: string, category: string, course: string, batch: string, date: string) {
    const data = {
      api: 'getLectures',
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

  getLecturesForStudent(
    branch: string,
    category: string,
    course: string,
    batch: string,
    date: string,
  ) {
    const data = {
      api: 'getLecturesForStudent',
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

  getLecture(id: string) {
    const data = { api: 'getLecture', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getUpcomingLecturesForEmployee(branch: string) {
    const data = { api: 'getUpcomingLecturesForEmployee', data: { branch } };
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
