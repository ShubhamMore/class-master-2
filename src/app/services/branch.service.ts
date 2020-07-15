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

  deleteBranchId() {
    this.branchId = null;
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

  deleteBranchData() {
    this.branch = null;
  }

  constructor(private httpService: HttpService) {}

  getBranches(imsMasterId: any) {
    const data = { api: 'getBranches', data: { imsMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchesForEmployee(imsMasterId: any) {
    const data = { api: 'getBranches', data: { imsMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchesForStudent(imsMasterId: any) {
    const data = { api: 'getBranches', data: { imsMasterId } };
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

  activateBranch(id: string, paymentDetails: any) {
    const data = { api: 'activateBranch', data: { id, paymentDetails } };
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
    const data = { api: 'deleteBranch', data: { id } };
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
