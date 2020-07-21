import { CourseModel } from '../models/course.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses = new BehaviorSubject<CourseModel[]>([]);
  private course = new BehaviorSubject<CourseModel>(null);
  private courseId: string;

  setCourseId(courseId: string) {
    this.courseId = courseId;
  }

  getCourseId() {
    return this.courseId;
  }

  deleteCourseId() {
    this.courseId = null;
  }

  setCoursesData(courses: CourseModel[]) {
    this.courses.next(courses);
  }

  getCoursesData() {
    return this.courses;
  }

  deleteCoursesData() {
    this.courses.next([]);
  }

  setCourseData(course: CourseModel) {
    this.course.next(course);
  }

  getCourseData() {
    return this.course;
  }

  deleteCourseData() {
    this.course.next(null);
  }

  getCourseName(courseId: string) {
    return this.courses.pipe(
      map((courses: CourseModel[]) => {
        const course = courses.find((curCourse: CourseModel) => curCourse._id === courseId);
        if (course) {
          return course.basicDetails.courseName;
        }
        return '--';
      }),
    );
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
    const data = { api: 'updateCourse', data: Course };
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
