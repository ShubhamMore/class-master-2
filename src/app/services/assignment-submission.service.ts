import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { AssignmentSubmissionModel } from '../models/assignment-submission.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentSubmissionService {
  private assignmentSubmissionId: string;
  private assignmentSubmission = new BehaviorSubject<AssignmentSubmissionModel>(null);

  setAssignmentSubmissionData(assignmentSubmission: AssignmentSubmissionModel) {
    this.assignmentSubmission.next(assignmentSubmission);
  }

  getAssignmentSubmissionData() {
    return this.assignmentSubmission;
  }

  deleteAssignmentSubmissionData() {
    this.assignmentSubmission.next(null);
  }

  setAssignmentSubmissionId(assignmentSubmissionId: string) {
    this.assignmentSubmissionId = assignmentSubmissionId;
  }

  getAssignmentSubmissionId() {
    return this.assignmentSubmissionId;
  }

  deleteAssignmentSubmissionId() {
    this.assignmentSubmissionId = null;
  }

  constructor(private httpService: HttpService) {}

  submitAssignment(assignmentSubmission: FormData) {
    const data = { api: 'submitAssignment', data: assignmentSubmission };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAssignmentSubmissions(assignment: string) {
    const data = { api: 'getAssignmentSubmissions', data: { assignment } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getSubmissionOfAssignment(assignment: string) {
    const data = { api: 'getSubmissionOfAssignment', data: { assignment } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAssignmentSubmission(id: string) {
    const data = { api: 'getAssignmentSubmission', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  updateAssignmentSubmission(assignmentSubmission: FormData) {
    const data = { api: 'updateAssignmentSubmission', data: assignmentSubmission };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteAssignmentSubmission(id: string) {
    const data = { api: 'deleteAssignmentSubmission', data: { id } };
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
