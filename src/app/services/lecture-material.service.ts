import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { LectureMaterialModel } from '../models/lecture-material.model';

@Injectable({
  providedIn: 'root',
})
export class LectureMaterialService {
  lectureMaterialId: string;
  lectureMaterial = new BehaviorSubject<LectureMaterialModel>(null);
  lectureMaterials = new BehaviorSubject<LectureMaterialModel[]>([]);

  setLectureMaterialId(lectureMaterialId: string) {
    this.lectureMaterialId = lectureMaterialId;
  }

  getLectureMaterialId() {
    return this.lectureMaterialId;
  }

  deleteLectureMaterialId() {
    this.lectureMaterialId = null;
  }

  setLectureMaterialsData(lectureMaterials: LectureMaterialModel[]) {
    this.lectureMaterials.next(lectureMaterials);
  }

  getLectureMaterialsData() {
    return this.lectureMaterials;
  }

  deleteLectureMaterialsData() {
    this.lectureMaterials.next([]);
  }

  setLectureMaterialData(lectureMaterial: LectureMaterialModel) {
    this.lectureMaterial.next(lectureMaterial);
  }

  getLectureMaterialData() {
    return this.lectureMaterial;
  }

  deleteLectureMaterialData() {
    this.lectureMaterial.next(null);
  }

  constructor(private httpService: HttpService) {}

  getLectureMaterials(
    branch: string,
    category: string,
    course: string,
    batch: string,
    lecture: string,
  ) {
    const data = { api: 'getLectureMaterials', data: { branch, category, course, batch, lecture } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getLectureMaterial(id: string) {
    const data = { api: 'getLectureMaterials', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getLectureMaterialsForStudent(
    branch: string,
    category: string,
    course: string,
    batch: string,
    lecture: string,
  ) {
    const data = {
      api: 'getLectureMaterialsForStudent',
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

  newLectureMaterials(materials: FormData) {
    const data = { api: 'newLectureMaterials', data: materials };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeLectureMaterialStatus(id: string, status: boolean) {
    const data = { api: 'changeLectureMaterialStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteLectureMaterial(id: string) {
    const data = { api: 'deleteLectureMaterial', data: { id } };
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
