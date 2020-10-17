import { OnlineExamModel } from './../models/online-exam.model';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineClassService {
  constructor(private httpService: HttpService) {}

  getZoomMeeting(lecture: string) {
    const data = { api: 'getZoomMeeting', data: { lecture } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }
  getZoomMeetingHostSignature(lecture: string) {
    const data = { api: 'getZoomMeetingHostSignature', data: { lecture } };
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
