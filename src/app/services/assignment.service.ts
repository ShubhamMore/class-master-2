import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { AssignmentModel } from '../models/assignment.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private assignmentId: string;
  private assignment = new BehaviorSubject<AssignmentModel>(null);

  setAssignmentData(assignment: AssignmentModel) {
    this.assignment.next(assignment);
  }

  getAssignmentData() {
    return this.assignment;
  }

  deleteAssignmentData() {
    this.assignment.next(null);
  }

  setAssignmentId(assignmentId: string) {
    this.assignmentId = assignmentId;
  }

  getAssignmentId() {
    return this.assignmentId;
  }

  deleteAssignmentId() {
    this.assignmentId = null;
  }

  constructor(private httpService: HttpService) {}

  saveAssignment(assignment: FormData) {
    const data = { api: 'saveAssignment', data: assignment };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAssignments(
    branch: string,
    category: string,
    course: string,
    batch: string,
    subject: string,
    month: string,
    year: string,
  ) {
    const data = {
      api: 'getAssignments',
      data: { branch, category, course, batch, subject, month, year },
    };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAssignment(id: string) {
    const data = { api: 'getAssignment', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  updateAssignment(assignment: FormData) {
    const data = { api: 'updateAssignment', data: assignment };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeAssignmentStatus(id: string, status: string) {
    const data = { api: 'changeAssignmentStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteAssignment(id: string) {
    const data = { api: 'deleteAssignment', data: { id } };
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
