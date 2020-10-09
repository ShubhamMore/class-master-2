import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BranchStudentModel } from '../models/branch-student.model';

@Injectable({ providedIn: 'root' })
export class BranchStudentService {
  private branchStudentId: string;
  private branchStudent: BranchStudentModel;

  setBranchStudentData(branchStudent: BranchStudentModel) {
    this.branchStudent = branchStudent;
  }

  getBranchStudentData() {
    return this.branchStudent;
  }

  deleteBranchStudentData() {
    this.branchStudent = null;
  }

  setBranchStudentId(branchStudentId: string) {
    this.branchStudentId = branchStudentId;
  }

  getBranchStudentId() {
    return this.branchStudentId;
  }

  deleteBranchStudentId() {
    this.branchStudentId = null;
  }

  constructor(private httpService: HttpService) {}

  getBranchStudents(branch: string, category: string, type: string) {
    const data = { api: 'getBranchStudents', data: { branch, category, type } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchStudentNameIds(branch: string, category: string, type: string) {
    const data = { api: 'getBranchStudentNameIds', data: { branch, category, type } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchStudent(id: string, student: string) {
    const data = { api: 'addBranchStudent', data: { id, student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  newBranchStudent(branchStudent: any) {
    const data = { api: 'newBranchStudent', data: branchStudent };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchStudentForEditing(id: string, student: string) {
    const data = { api: 'getBranchStudentForEditing', data: { id, student } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editBranchStudent(branchStudent: BranchStudentModel) {
    const data = { api: 'updateBranchStudent', data: branchStudent };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeBranchStudentStatus(id: string, status: boolean) {
    const data = { api: 'changeBranchStudentStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteBranchStudent(id: string) {
    const data = { api: 'deleteBranchStudent', data: { id } };
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
