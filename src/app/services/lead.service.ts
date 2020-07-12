import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LeadModel } from '../models/Lead.model';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  lead: LeadModel;

  private leadSearchData: any = {
    branch: '',
    category: '',
    course: '',
    date: null,
  };

  setBranch(branch: string) {
    this.leadSearchData.branch = branch;
  }
  getBranch() {
    return this.leadSearchData.branch;
  }

  setCategory(category: string) {
    this.leadSearchData.category = category;
  }
  getCategory() {
    return this.leadSearchData.category;
  }

  setCourse(course: string) {
    this.leadSearchData.course = course;
  }
  getCourse() {
    return this.leadSearchData.course;
  }

  constructor(private httpService: HttpService) {}

  saveLead(lead: any) {
    const data = { api: 'saveLead', data: lead };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getLeads(course: any, leadType: string) {
    const data = { api: 'getLeads', data: { course, leadType } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getLead(id: string) {
    const data = { api: 'getLead', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getLeadForEditing(id: string) {
    const data = { api: 'getLeadForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editLead(lead: LeadModel) {
    const data = { api: 'editLead', data: lead };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeLeadStatus(id: string, status: boolean) {
    const data = { api: 'changeLeadStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteLead(id: string) {
    const data = { api: 'deleteLead', data: { id } };
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
