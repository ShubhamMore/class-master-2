import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private searchMonth: string;
  private searchYear: string;

  setMonth(month: string) {
    this.searchMonth = month;
  }
  getMonth() {
    return this.searchMonth;
  }

  setYear(year: string) {
    this.searchYear = year;
  }

  getYear() {
    return this.searchYear;
  }

  constructor(private httpService: HttpService) {}

  getBudgetForBranch(branch: string, month: string, year: string) {
    const data = { api: 'getBudgetForBranch', data: { branch, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBudgetForBranchDashboard(branch: string, year: string) {
    const data = { api: 'getBudgetForBranchDashboard', data: { branch, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBudgetSummery(branch: string, month: string, year: string) {
    const data = { api: 'getBudgetSummery', data: { branch, month, year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  saveBudget(budget: any) {
    const data = { api: 'saveBudget', data: budget };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteBudget(id: string) {
    const data = { api: 'deleteBudget', data: { id } };
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
