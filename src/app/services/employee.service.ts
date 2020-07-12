import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeBranchModel } from '../models/employee-branch.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employee: EmployeeModel;
  private employeeBranch: EmployeeBranchModel;

  private employeeSearchData = {
    branch: '',
  };

  constructor(private httpService: HttpService) {}

  setEmployeeBranchData(employeeBranch: EmployeeBranchModel) {
    this.employeeBranch = employeeBranch;
  }
  getEmployeeBranchData() {
    return this.employeeBranch;
  }

  setEmployeeData(employee: EmployeeModel) {
    this.employee = employee;
  }

  getEmployeeData() {
    return this.employee;
  }

  setBranch(branch: string) {
    this.employeeSearchData.branch = branch;
  }

  getBranch() {
    return this.employeeSearchData.branch;
  }

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

  getEmployeeProfile(id: string) {
    const data = { api: 'getEmployeeProfile', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeEmployeeStatus(employee: string, status: boolean) {
    const data = { api: 'changeEmployeeStatus', data: { employee, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployee(id: string) {
    const data = { api: 'getEmployee', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAllEmployeeByBranch(branch: string) {
    const data = { api: 'getAllEmployeeByBranch', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeEmployeeBranchStatus(employee: string, branch: string, status: boolean) {
    const data = { api: 'changeEmployeeBranchStatus', data: { employee, branch, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeForSalaryByBranch(employee: string, branch: string) {
    const data = { api: 'getEmployeeForSalaryByBranch', data: { employee, branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeBranchForEditing(employee: string, branch: string) {
    const data = { api: 'getEmployeeForEditing', data: { employee, branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addEmployeeBranch(employeeBranch: any) {
    const data = { api: 'addEmployeeBranch', data: employeeBranch };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editEmployeeBranch(employeeBranch: EmployeeBranchModel) {
    const data = { api: 'editEmployeeBranch', data: employeeBranch };
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
