import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { EmployeeLeaveModel } from '../models/employee-leave.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLeaveService {
  private employeeLeaveId: string;

  private employeeLeave = new BehaviorSubject<EmployeeLeaveModel>(null);

  setEmployeeLeaveData(employeeLeave: EmployeeLeaveModel) {
    this.employeeLeave.next(employeeLeave);
  }

  getEmployeeLeaveData() {
    return this.employeeLeave;
  }

  deleteEmployeeLeaveData() {
    this.employeeLeave.next(null);
  }

  setEmployeeLeaveId(employeeLeaveId: string) {
    this.employeeLeaveId = employeeLeaveId;
  }

  getEmployeeLeaveId() {
    return this.employeeLeaveId;
  }

  deleteEmployeeLeaveId() {
    this.employeeLeaveId = null;
  }

  constructor(private httpService: HttpService) {}

  createEmployeeLeave(employeeLeave: any) {
    const data = { api: 'createEmployeeLeave', data: employeeLeave };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeEmployeeLeaveStatus(id: string, status: boolean) {
    const data = { api: 'changeEmployeeLeaveStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeLeaves(employee: string, month: string, year: string) {
    const data = { api: 'getEmployeeLeaves', data: { employee, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchAllEmployeeLeaves(branch: string, employee: string, month: string, year: string) {
    const data = { api: 'getBranchAllEmployeeLeaves', data: { branch, employee, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchEmployeeLeaves(branch: string, employee: string, month: string, year: string) {
    const data = { api: 'getBranchEmployeeLeaves', data: { branch, employee, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getMyBranchLeaves(branch: string, month: string, year: string) {
    const data = { api: 'getMyBranchLeaves', data: { branch, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeLeave(id: string) {
    const data = { api: 'getEmployeeLeave', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  updateEmployeeLeave(employeeLeave: any) {
    const data = { api: 'updateEmployeeLeave', data: employeeLeave };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteEmployeeLeave(id: string) {
    const data = { api: 'deleteEmployeeLeave', data: { id } };
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
