import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  private membershipType: string; // new, renew

  setMembershipType(membershipType: string) {
    this.membershipType = membershipType;
  }

  getMembershipType() {
    return this.membershipType;
  }

  constructor(private httpService: HttpService) {}
}
