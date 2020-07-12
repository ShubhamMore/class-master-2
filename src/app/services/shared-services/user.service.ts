import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfile: any;

  setUserProfile(profile: any) {
    this.userProfile = profile;
  }

  getUserProfile() {
    return this.userProfile;
  }

  constructor(private httpService: HttpService) {}

  checkUser(email: string) {
    const data = { api: 'checkUser', data: { email } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changePassword(password: any) {
    const data = { api: 'changePassword', data: password };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  saveProfile(profile: any) {
    const data = { api: 'saveProfile', data: profile };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getProfile() {
    const data = { api: 'getProfile', data: {} };
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
