import { HttpService } from './shared-services/http.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstituteOrderService {
  private instituteOrderDetails: any;

  getInstituteOrderDetails() {
    return this.instituteOrderDetails;
  }

  setInstituteOrderDetails(instituteOrder: any) {
    this.instituteOrderDetails = instituteOrder;
  }

  deleteInstituteOrderDetails() {
    this.instituteOrderDetails = null;
  }

  constructor(private httpService: HttpService) {}

  deleteInstituteOrder(id: string) {
    const data = { api: 'deleteInstituteOrder', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  generateInstituteOrder(instituteOrder: any) {
    const data = { api: 'generateInstituteOrder', data: instituteOrder };
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
