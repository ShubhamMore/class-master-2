import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BudgetModel } from '../models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private budgetSearchData = {
    searchDuration: '0',
    searchType: '0',
    year: null,
    month: null,
  };

  setSearchDuration(searchDuration: string) {
    this.budgetSearchData.searchDuration = searchDuration;
  }

  getSearchDuration() {
    return this.budgetSearchData.searchDuration;
  }

  setSearchType(searchType: string) {
    this.budgetSearchData.searchType = searchType;
  }

  getSearchType() {
    return this.budgetSearchData.searchType;
  }

  setMonth(month: string) {
    this.budgetSearchData.month = month;
  }
  getMonth() {
    return this.budgetSearchData.month;
  }

  setYear(year: string) {
    this.budgetSearchData.year = year;
  }
  getYear() {
    return this.budgetSearchData.year;
  }

  constructor(private httpService: HttpService) {}

  getBudget(searchData: any) {
    const data = { api: 'getBudget', data: searchData };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBudgetToShow(id: any) {
    const data = { api: 'getBudgetToShow', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBudgetSummery(searchData: any) {
    const data = { api: 'getBudgetSummery', data: searchData };
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

  getBudgetSummeryByYear(year: any) {
    const data = { api: 'getBudgetSummeryByYear', data: { year } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editBudget(budget: BudgetModel) {
    const data = { api: 'editBudget', data: budget };
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
