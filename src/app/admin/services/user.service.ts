import { Injectable } from '@angular/core';
import { HttpService } from '../../services/shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) {}

  getUsers() {
    const data = {
      api: 'getUsers',
      data: {},
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

  changeUserStatus(user: string, status: boolean) {
    const data = {
      api: 'changeUserStatus',
      data: { user, status },
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
}
