import { BranchModel } from '../../models/branch.model';
import { InstituteModel } from '../../models/institute.model';
import { Injectable } from '@angular/core';
import { HttpService } from '../../services/shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable()
export class InstituteService {
  private institute = new BehaviorSubject<InstituteModel>(null);
  private instituteId: String;

  private branch = new BehaviorSubject<BranchModel>(null);
  private branchId: String;

  getInstitute() {
    return this.institute;
  }

  setInstitute(institute: InstituteModel) {
    this.institute.next(institute);
  }

  deleteInstitute() {
    this.institute.next(null);
  }

  getInstituteId() {
    return this.instituteId;
  }

  setInstituteId(id: string) {
    this.instituteId = id;
  }

  deleteInstituteId() {
    this.instituteId = null;
  }

  getBranch() {
    return this.branch;
  }

  setBranch(branch: BranchModel) {
    this.branch.next(branch);
  }

  deleteBranch() {
    this.branch.next(null);
  }

  getBranchId() {
    return this.branchId;
  }

  setBranchId(id: string) {
    this.branchId = id;
  }

  deleteBranchId() {
    this.branchId = null;
  }

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

  activateInstituteBranch(branch: string, planType: string, amount: any) {
    const data = {
      api: 'activateInstituteBranch',
      data: { branch, planType, amount },
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
