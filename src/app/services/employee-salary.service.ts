import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';
import { EmployeeSalaryModel } from '../models/employee-salary.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeSalaryService {
  employeeSalary: EmployeeSalaryModel;

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

  getAllSalaries(branch: string, employee: string) {
    const data = { api: 'getAllSalaries', data: { branch, employee } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAllSalariesForEmployee(branch: string, employee: string) {
    const data = { api: 'getAllSalariesForEmployee', data: { branch, employee } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getEmployeeSalary(employeeSalary: string) {
    const data = { api: 'getEmployeeSalary', data: { employeeSalary } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteEmployeeSalary(employeeSalary: string) {
    const data = { api: 'deleteEmployeeSalary', data: { employeeSalary } };
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
