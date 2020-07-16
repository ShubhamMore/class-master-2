import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BranchEmployeeModel } from '../models/branch-employee.model';

@Injectable({ providedIn: 'root' })
export class BranchEmployeeService {
  private branchEmployeeId: string;
  private branchEmployee: BranchEmployeeModel;

  setBranchEmployeeData(branchEmployee: BranchEmployeeModel) {
    this.branchEmployee = branchEmployee;
  }

  getBranchEmployeeData() {
    return this.branchEmployee;
  }

  deleteBranchEmployeeData() {
    this.branchEmployee = null;
  }

  setBranchEmployeeId(branchEmployeeId: string) {
    this.branchEmployeeId = branchEmployeeId;
  }

  getBranchEmployeeId() {
    return this.branchEmployeeId;
  }

  deleteBranchEmployeeId() {
    this.branchEmployeeId = null;
  }

  constructor(private httpService: HttpService) {}

  getBranchEmployees(branch: string, type: string) {
    const data = { api: 'getBranchEmployees', data: { branch, type } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchEmployee(id: string, employee: string) {
    const data = { api: 'addBranchEmployee', data: { id, employee } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchEmployeeForSalary(id: string, employee: string) {
    const data = { api: 'getBranchEmployeeForSalary', data: { id, employee } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  newBranchEmployee(branchEmployee: any) {
    const data = { api: 'newBranchEmployee', data: branchEmployee };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchEmployeeForEditing(id: string, employee: string) {
    const data = { api: 'getBranchEmployeeForEditing', data: { id, employee } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editBranchEmployee(branchEmployee: BranchEmployeeModel) {
    const data = { api: 'updateBranchEmployee', data: branchEmployee };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeBranchEmployeeStatus(id: string, status: boolean) {
    const data = { api: 'changeBranchEmployeeStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteBranchEmployee(id: string) {
    const data = { api: 'deleteBranchEmployee', data: { id } };
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
