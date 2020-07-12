import { BranchModel } from '../models/branch.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BranchService {
  private branchId: string;

  private branch: BranchModel;

  setBranchId(branchId: string) {
    this.branchId = branchId;
  }

  getBranchId() {
    return this.branchId;
  }

  setBranchData(branch: BranchModel) {
    this.branch = branch;
  }

  getBranchData() {
    return this.branch;
  }

  constructor(private httpService: HttpService) {}

  getBranches(classMasterId: any) {
    const data = { api: 'getBranches', data: { classMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchesForEmployee(classMasterId: any) {
    const data = { api: 'getBranches', data: { classMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchesForStudent(classMasterId: any) {
    const data = { api: 'getBranches', data: { classMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranch(id: string) {
    const data = { api: 'getBranch', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchForEditing(id: string) {
    const data = { api: 'getBranchForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addBranch(branch: any) {
    const data = { api: 'newBranch', data: branch };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editBranch(branch: any) {
    const data = { api: 'updateBranch', data: branch };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  activateBranch(branch: string) {
    const data = { api: 'activateBranch', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deactivateBranch(branch: string) {
    const data = { api: 'deactivateBranch', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeBranchStatus(id: string, status: boolean) {
    const data = { api: 'changeBranchStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteBranch(id: string) {
    // this.branches.splice(id, 1);
  }
}
