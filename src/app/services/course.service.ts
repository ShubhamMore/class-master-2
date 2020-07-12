import { CourseModel } from '../models/course.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  course: CourseModel;

  private courseSearchData = {
    branch: '',
    category: '',
  };

  setBranch(branch: string) {
    this.courseSearchData.branch = branch;
  }

  getBranch() {
    return this.courseSearchData.branch;
  }

  setCategory(category: string) {
    this.courseSearchData.category = category;
  }
  getCategory() {
    return this.courseSearchData.category;
  }

  constructor(private httpService: HttpService) {}

  getCourses(branch: any, category: any) {
    const data = { api: 'getCourses', data: { branch, category } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getCourse(id: string) {
    const data = { api: 'getCourse', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getCourseForEditing(id: string) {
    const data = { api: 'getCourseForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addCourse(Course: any) {
    const data = { api: 'newCourse', data: Course };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editCourse(Course: any) {
    const data = { api: 'editCourse', data: Course };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteCourse(id: string) {
    // this.Courses.splice(id, 1);
  }

  changeCourseStatus(id: string, status: boolean) {
    const data = { api: 'changeCourseStatus', data: { id, status } };
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
