import { map, catchError } from 'rxjs/operators';
import { MembershipPlanModel } from '../models/membership-plan.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  private membershipType: string; // new, renew

  private membershipPlan = new BehaviorSubject<MembershipPlanModel>(null);

  setMembershipPlan(membershipPlan: MembershipPlanModel) {
    this.membershipPlan.next(membershipPlan);
  }

  getMembershipPlan() {
    return this.membershipPlan;
  }

  setMembershipType(membershipType: string) {
    this.membershipType = membershipType;
  }

  getMembershipType() {
    return this.membershipType;
  }

  constructor(private httpService: HttpService) {}

  getMemberships() {
    const data = { api: 'getMembershipPlans', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getMembership(name: any) {
    const data = { api: 'getMembershipPlan', data: { name } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  saveMembershipPlan(membershipPlan: any) {
    const data = { api: 'saveMembershipPlan', data: membershipPlan };
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
