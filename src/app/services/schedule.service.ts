import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';
import { ScheduleModel } from '../models/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private schedule: ScheduleModel;

  private scheduleSearchData = {
    branch: '',
    category: '',
    course: '',
    batch: '',
  };

  constructor(private httpService: HttpService) {}

  setScheduleData(Schedule: ScheduleModel) {
    this.schedule = Schedule;
  }

  getScheduleData() {
    return this.schedule;
  }

  setBranch(branch: string) {
    this.scheduleSearchData.branch = branch;
  }
  getBranch() {
    return this.scheduleSearchData.branch;
  }

  setCategory(category: string) {
    this.scheduleSearchData.category = category;
  }
  getCategory() {
    return this.scheduleSearchData.category;
  }

  setCourse(course: string) {
    this.scheduleSearchData.course = course;
  }
  getCourse() {
    return this.scheduleSearchData.course;
  }

  setBatch(batch: string) {
    this.scheduleSearchData.batch = batch;
  }
  getBatch() {
    return this.scheduleSearchData.batch;
  }

  addSchedule(schedule: any) {
    const data = { api: 'newSchedule', data: schedule };
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

  getAllSchedules(branch: string, category: string, course: string, batch: string) {
    const data = { api: 'getAllSchedules', data: { branch, category, course, batch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getSchedule(schedule: string) {
    const data = { api: 'getSchedule', data: { schedule } };
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

  editSchedule(schedule: ScheduleModel) {
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

  deleteSchedule(schedule: string) {
    const data = { api: 'deleteSchedule', data: { schedule } };
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
