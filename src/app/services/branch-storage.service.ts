import { BranchStorageModel } from '../models/branch-storage.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchStorageService {
  branchStorage = new BehaviorSubject<BranchStorageModel>(null);

  setBranchStorageDetails(branchStorage: BranchStorageModel) {
    this.branchStorage.next(branchStorage);
  }

  getBranchStorageDetails() {
    return this.branchStorage;
  }

  deleteBranchStorageDetails() {
    this.branchStorage.next(null);
  }

  constructor(private httpService: HttpService) {}

  getBranchStorage(branch: any) {
    const data = { api: 'getBranchStorage', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  updateBranchStorage(branch: string, storagePackage: string, order: string, receipt: string) {
    const data = { api: 'updateBranchStorage', data: { branch, storagePackage, order, receipt } };
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
