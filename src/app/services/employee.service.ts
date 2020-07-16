import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeeId: string;

  private employee: EmployeeModel;

  setEmployeeData(employee: EmployeeModel) {
    this.employee = employee;
  }

  getEmployeeData() {
    return this.employee;
  }

  deleteEmployeeData() {
    this.employee = null;
  }

  setEmployeeId(employeeId: string) {
    this.employeeId = employeeId;
  }

  getEmployeeId() {
    return this.employeeId;
  }

  deleteEmployeeId() {
    this.employeeId = null;
  }

  constructor(private httpService: HttpService) {}

  addEmployee(employee: any) {
    const data = { api: 'newEmployee', data: employee };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployees() {
    const data = { api: 'getEmployees', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployee(employee: string) {
    const data = { api: 'getEmployee', data: { employee } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeForEditing(id: string) {
    const data = { api: 'getEmployeeForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeEmployeeStatus(id: string, status: boolean) {
    const data = { api: 'changeEmployeeStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editEmployee(employee: EmployeeModel) {
    const data = { api: 'updateEmployee', data: employee };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteEmployee(id: string) {
    const data = { api: 'deleteEmployee', data: { id } };
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
