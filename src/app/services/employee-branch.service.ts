import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeBranchModel } from '../models/employee-branch.model';

@Injectable({ providedIn: 'root' })
export class EmployeeBranchService {
  private employeeBranchId: string;
  private employeeBranch: EmployeeBranchModel;

  setEmployeeBranchData(employeeBranch: EmployeeBranchModel) {
    this.employeeBranch = employeeBranch;
  }

  getEmployeeBranchData() {
    return this.employeeBranch;
  }

  deleteEmployeeBranchData() {
    this.employeeBranch = null;
  }

  setEmployeeBranchId(employeeBranchId: string) {
    this.employeeBranchId = employeeBranchId;
  }

  getEmployeeBranchId() {
    return this.employeeBranchId;
  }

  deleteEmployeeBranchId() {
    this.employeeBranchId = null;
  }

  constructor(private httpService: HttpService) {}

  getBranchEmployees(branch: string) {
    const data = { api: 'getBranchEmployees', data: { branch } };
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
    const data = { api: 'addEmployeeBranch', data: { id, employee } };
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

  editBranchEmployee(branchEmployee: EmployeeBranchModel) {
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
