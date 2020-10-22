import { Injectable } from '@angular/core';
import { HttpService } from '../services/shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AdminService {
  constructor(private httpService: HttpService) {}

  saveAdminZoomKeys(keys: any) {
    const data = {
      api: 'saveAdminZoomKeys',
      data: keys,
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

  getAdminZoomKeys() {
    const data = {
      api: 'getAdminZoomKeys',
    };

    return this.httpService.httpGet(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getAdminZoomAuthLink() {
    const data = {
      api: 'getAdminZoomAuthLink',
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
}
