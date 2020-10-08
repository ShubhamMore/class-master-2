import { EmployeeNameIdModel } from './../models/branch-employee.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { BranchEmployeeModel } from '../models/branch-employee.model';

@Injectable({ providedIn: 'root' })
export class BranchEmployeeService {
  private branchEmployeeId: string;
  private branchEmployee = new BehaviorSubject<BranchEmployeeModel>(null);
  private branchEmployees = new BehaviorSubject<BranchEmployeeModel[]>([]);
  private branchEmployeeNameIds = new BehaviorSubject<EmployeeNameIdModel[]>([]);

  setBranchEmployeeData(branchEmployee: BranchEmployeeModel) {
    this.branchEmployee.next(branchEmployee);
  }

  getBranchEmployeeData() {
    return this.branchEmployee;
  }

  deleteBranchEmployeeData() {
    this.branchEmployee.next(null);
  }

  setBranchEmployeesData(branchEmployees: BranchEmployeeModel[]) {
    this.branchEmployees.next(branchEmployees);
  }

  getBranchEmployeesData() {
    return this.branchEmployees;
  }

  deleteBranchEmployeesData() {
    this.branchEmployees.next([]);
  }

  setBranchEmployeeNameIdsData(branchEmployeeNameIds: EmployeeNameIdModel[]) {
    this.branchEmployeeNameIds.next(branchEmployeeNameIds);
  }

  getBranchEmployeeNameIdsData() {
    return this.branchEmployeeNameIds;
  }

  deleteBranchEmployeeNameIdsData() {
    this.branchEmployeeNameIds.next([]);
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

  getBranchEmployeesForBatch(branch: string, role: string) {
    const data = { api: 'getBranchEmployeesForBatch', data: { branch, role } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchEmployeeNameIds(branch: string, type: string) {
    const data = { api: 'getBranchEmployeeNameIds', data: { branch, type } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchEmployeeNameIdsForBatch(branch: string, role: string) {
    const data = { api: 'getBranchEmployeeNameIdsForBatch', data: { branch, role } };
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

  getBranchEmployeeRole(branch: string) {
    const data = { api: 'getBranchEmployeeRole', data: { branch } };
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
