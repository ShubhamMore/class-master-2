import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { EmployeeSalaryModel } from '../models/employee-salary.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSalaryService {
  private employeeSalaryId: string;

  private employeeSalary = new BehaviorSubject<EmployeeSalaryModel>(null);

  setEmployeeSalaryData(employeeSalary: EmployeeSalaryModel) {
    this.employeeSalary.next(employeeSalary);
  }

  getEmployeeSalaryData() {
    return this.employeeSalary;
  }

  deleteEmployeeSalaryData() {
    this.employeeSalary.next(null);
  }

  setEmployeeSalaryId(employeeSalaryId: string) {
    this.employeeSalaryId = employeeSalaryId;
  }

  getEmployeeSalaryId() {
    return this.employeeSalaryId;
  }

  deleteEmployeeSalaryId() {
    this.employeeSalaryId = null;
  }

  constructor(private httpService: HttpService) {}

  addEmployeeSalary(employeeSalary: any) {
    const data = { api: 'newEmployeeSalary', data: employeeSalary };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeEmployeeSalaryStatus(id: string, status: boolean) {
    const data = { api: 'changeEmployeeSalaryStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchEmployeeSalaries(branch: string, employee: string, month: string, year: string) {
    const data = { api: 'getBranchEmployeeSalaries', data: { branch, employee, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeSalaries(employee: string, month: string, year: string) {
    const data = { api: 'getEmployeeSalaries', data: { employee, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeSalary(id: string) {
    const data = { api: 'getEmployeeSalary', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteEmployeeSalary(id: string) {
    const data = { api: 'deleteEmployeeSalary', data: { id } };
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
