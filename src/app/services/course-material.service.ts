import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { CourseMaterialModel } from '../models/course-material.model';

@Injectable({
  providedIn: 'root',
})
export class CourseMaterialService {
  courseMaterialId: string;
  courseMaterial = new BehaviorSubject<CourseMaterialModel>(null);
  courseMaterials = new BehaviorSubject<CourseMaterialModel[]>([]);

  setCourseMaterialId(courseMaterialId: string) {
    this.courseMaterialId = courseMaterialId;
  }

  getCourseMaterialId() {
    return this.courseMaterialId;
  }

  deleteCourseMaterialId() {
    this.courseMaterialId = null;
  }

  setCourseMaterialsData(courseMaterials: CourseMaterialModel[]) {
    this.courseMaterials.next(courseMaterials);
  }

  getCourseMaterialsData() {
    return this.courseMaterials;
  }

  deleteCourseMaterialsData() {
    this.courseMaterials.next([]);
  }

  setCourseMaterialData(courseMaterial: CourseMaterialModel) {
    this.courseMaterial.next(courseMaterial);
  }

  getCourseMaterialData() {
    return this.courseMaterial;
  }

  deleteCourseMaterialData() {
    this.courseMaterial.next(null);
  }

  constructor(private httpService: HttpService) {}

  getCourseMaterials(branch: string, category: string, course: string, subject: string) {
    const data = { api: 'getCourseMaterials', data: { branch, category, course, subject } };
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
      api: 'getCourseMaterialsForStudent',
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
