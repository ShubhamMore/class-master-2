import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';
import { CourseMaterialModel } from '../models/course-material.model';

@Injectable({
  providedIn: 'root',
})
export class CourseMaterialService {
  courseMaterial: CourseMaterialModel;

  private courseMaterialSearchData: any = {
    branch: '',
    category: '',
    course: '',
    subject: '',
  };

  setBranch(branch: string) {
    this.courseMaterialSearchData.branch = branch;
  }
  getBranch() {
    return this.courseMaterialSearchData.branch;
  }

  setCategory(category: string) {
    this.courseMaterialSearchData.category = category;
  }
  getCategory() {
    return this.courseMaterialSearchData.category;
  }

  setCourse(course: string) {
    this.courseMaterialSearchData.course = course;
  }
  getCourse() {
    return this.courseMaterialSearchData.course;
  }

  setSubject(subject: string) {
    this.courseMaterialSearchData.subject = subject;
  }
  getSubject() {
    return this.courseMaterialSearchData.subject;
  }

  constructor(private httpService: HttpService) {}

  getCourseMaterials(branch: string, category: string, course: string, subject: string) {
    const data = { api: 'geCourseMaterials', data: { branch, category, course, subject } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getCourseMaterialsForStudent(branch: string, category: string, course: string, subject: string) {
    const data = {
      api: 'geCourseMaterialsForStudent',
      data: { branch, category, course, subject },
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

  newCourseMaterials(materials: FormData) {
    const data = { api: 'newCourseMaterials', data: materials };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeCourseMaterialStatus(id: string, status: boolean) {
    const data = { api: 'changeCourseMaterialStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteCourseMaterial(id: string) {
    const data = { api: 'deleteCourseMaterial', data: { id } };
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
