import { Injectable } from '@angular/core';
import { HttpService } from '../../services/shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class InstituteService {
  constructor(private httpService: HttpService) {}

  getInstitutes() {
    const data = {
      api: 'getInstitutes',
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

  getInstituteBranches(institute: string) {
    const data = {
      api: 'getInstituteBranches',
      data: { institute },
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

  getInstituteBranch(branch: string) {
    const data = {
      api: 'getInstituteBranch',
      data: { branch },
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

  getInstituteBranchHistory(branch: string) {
    const data = {
      api: 'getInstituteBranchHistory',
      data: { branch },
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

  deactivateInstituteBranch(branch: string) {
    const data = {
      api: 'deactivateInstituteBranch',
      data: { branch },
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

  activateInstituteBranch(branch: string, planType: string) {
    const data = {
      api: 'activateInstituteBranch',
      data: { branch, planType },
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
