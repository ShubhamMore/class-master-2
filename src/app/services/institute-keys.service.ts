import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteKeysService {
  constructor(private httpService: HttpService) {}

  getInstituteKeys() {
    const data = {
      api: 'getInstituteKeys',
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

  saveInstitutePaymentGatewayKeys(keys: string) {
    const data = {
      api: 'saveInstitutePaymentGatewayKeys',
      data: { keys },
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

  saveInstituteZoomKeys(keys: any) {
    const data = {
      api: 'saveInstituteZoomKeys',
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

  generateZoomAuthToken() {
    const data = {
      api: 'generateZoomAuthToken',
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

  getZoomAuthLink() {
    const data = {
      api: 'getZoomAuthLink',
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
