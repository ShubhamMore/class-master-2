import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { LeadModel } from '../models/Lead.model';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private leadId: string;
  private lead = new BehaviorSubject<LeadModel>(null);

  setLeadData(lead: LeadModel) {
    this.lead.next(lead);
  }

  getLeadData() {
    return this.lead;
  }

  deleteLeadData() {
    this.lead.next(null);
  }

  setLeadId(leadId: string) {
    this.leadId = leadId;
  }

  getLeadId() {
    return this.leadId;
  }

  deleteLeadId() {
    this.leadId = null;
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

  getLeads(branch: string, category: string, course: any, leadType: string) {
    const data = { api: 'getLeads', data: { branch, category, course, leadType } };
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

  changeLeadStatus(id: string, status: string) {
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
