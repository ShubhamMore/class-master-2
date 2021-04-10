import { Injectable } from '@angular/core';
import { HttpService } from '../../services/shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpService: HttpService) {}

  getAdminDashboard() {
    const data = {
      api: 'getAdminDashboard',
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
