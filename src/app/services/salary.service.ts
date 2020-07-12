import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';
import { SalaryModel } from '../models/salary.model';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  Salary: SalaryModel;

  constructor(private httpService: HttpService) {}

  addSalary(salary: any) {
    const data = { api: 'newSalary', data: salary };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeSalaryStatus(id: string, status: boolean) {
    const data = { api: 'changeSalaryStatus', data: { id, status } };
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

  getSalary(salary: string) {
    const data = { api: 'getSalary', data: { salary } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteSalary(salary: string) {
    const data = { api: 'deleteSalary', data: { salary } };
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
