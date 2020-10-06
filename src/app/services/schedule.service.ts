import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { ScheduleModel } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private schedule = new BehaviorSubject<ScheduleModel>(null);
  private scheduleId: string;
  private scheduleDay: string;

  setScheduleData(Schedule: ScheduleModel) {
    this.schedule.next(Schedule);
  }

  getScheduleData() {
    return this.schedule;
  }

  deleteScheduleData() {
    this.schedule.next(null);
  }

  setScheduleId(scheduleId: string) {
    this.scheduleId = scheduleId;
  }

  getScheduleId() {
    return this.scheduleId;
  }

  deleteScheduleId() {
    this.scheduleId = null;
  }

  setScheduleDay(scheduleDay: string) {
    this.scheduleDay = scheduleDay;
  }

  getScheduleDay() {
    return this.scheduleDay;
  }

  deleteScheduleDay() {
    this.scheduleDay = null;
  }

  constructor(private httpService: HttpService) {}

  addSchedule(schedules: any[]) {
    const data = { api: 'newSchedule', data: schedules };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeScheduleStatus(id: string, status: boolean) {
    const data = { api: 'changeScheduleStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAllSchedules(
    branch: string,
    category: string,
    course: string,
    batch: string,
    startDate: string,
    endDate: string,
  ) {
    const data = {
      api: 'getAllSchedule',
      data: { branch, category, course, batch, startDate, endDate },
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

  getSchedule(id: string) {
    const data = { api: 'getSchedule', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getScheduleForEditing(schedule: string) {
    const data = { api: 'getScheduleForEditing', data: { schedule } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editSchedule(schedule: any) {
    const data = { api: 'editSchedule', data: schedule };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteSchedule(id: string) {
    const data = { api: 'deleteSchedule', data: { id } };
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
