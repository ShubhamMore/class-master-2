import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpService: HttpService) {}
  getTransactionHistory() {
    const data = {
      api: 'getTransactionHistory',
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
