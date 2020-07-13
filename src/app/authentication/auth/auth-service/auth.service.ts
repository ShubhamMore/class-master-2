import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, tap, take, map } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../auth-model/user.model';
import { environment } from '../../../../environments/environment';

export interface AuthResponseData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userRole: string;
  imsMasterId: string;
  token: string;
  expiresIn: string;
}

export class UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  imsMasterId: string;
  userRole: string;
  _token: string;
  _tokenExpirationDate: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getUser() {
    return this.user;
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  getUserToken() {
    return JSON.parse(localStorage.getItem('userData'))._token;
  }

  createUser(data: any) {
    return this.http.post<AuthResponseData>(environment.backend + 'newUser', data).pipe(
      catchError(this.handleError),
      tap((res: any) => {
        this.handleAuthentication(
          res._id,
          res.name,
          res.email,
          res.phone,
          res.userRole,
          res.imsMasterId,
          res.token,
          +res.expiresIn,
        );
      }),
    );
  }

  login(email: string, password: string) {
    const data = {
      email,
      password,
    };
    return this.http.post<AuthResponseData>(environment.backend + 'login', data).pipe(
      catchError(this.handleError),
      tap((res: any) => {
        this.handleAuthentication(
          res._id,
          res.name,
          res.email,
          res.phone,
          res.userRole,
          res.imsMasterId,
          res.token,
          res.expiresIn,
        );
      }),
    );
  }

  loadUser(userData: UserData) {
    const loadedUser = new User(
      userData._id,
      userData.name,
      userData.email,
      userData.phone,
      userData.userRole,
      userData.imsMasterId,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);

      if (loadedUser.userRole === 'admin') {
        this.router.navigate(['/admin'], { relativeTo: this.route });
      } else if (loadedUser.userRole === 'employee' || loadedUser.userRole === 'institute') {
        this.router.navigate(['/institute'], { relativeTo: this.route });
      } else if (loadedUser.userRole === 'student') {
        this.router.navigate(['/student'], { relativeTo: this.route });
      } else {
        this.router.navigate(['/'], {
          relativeTo: this.route,
        });
      }
      return;
    }
  }

  autoLogin(userData: UserData) {
    this.loadUser(userData);
    this.http.post(environment.backend + 'autoLogin', {}).subscribe(
      (response: any) => {},
      (err: any) => {
        this.removeUser();
        this.router.navigate(['/login'], { relativeTo: this.route });
      },
    );
  }

  logout() {
    return this.http.post(environment.backend + 'logout', {}).subscribe(
      (res: any) => {
        console.log('c');
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      },
      (errorMessage: any) => {},
    );
  }

  removeUser() {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
    }
    this.user.next(null);
  }

  logoutAll() {
    return this.http.post(environment.backend + 'logoutAll', {}).subscribe(
      (res: any) => {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      },
      (errorMessage: any) => {},
    );
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    userId: string,
    name: string,
    email: string,
    phone: string,
    userRole: string,
    imsMasterId: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, name, email, phone, userRole, imsMasterId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error) {
      if (typeof errorRes.error === 'object') {
        errorMessage = 'Cant Reach Server.., Please Try Again';
      } else {
        errorMessage = errorRes.error;
      }
    }
    return throwError(errorMessage);
  }
}
