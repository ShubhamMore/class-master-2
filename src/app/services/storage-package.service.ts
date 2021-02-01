import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './shared-services/http.service';
import { throwError, BehaviorSubject } from 'rxjs';
import { StoragePackageModel } from '../models/storage-package.model';

@Injectable({
  providedIn: 'root',
})
export class StoragePackageService {
  private storagePackage = new BehaviorSubject<StoragePackageModel>(null);
  private storagePackageId: string;

  setStoragePackageData(StoragePackage: StoragePackageModel) {
    this.storagePackage.next(StoragePackage);
  }

  getStoragePackageData() {
    return this.storagePackage;
  }

  deleteStoragePackageData() {
    this.storagePackage.next(null);
  }

  setStoragePackageId(storagePackageId: string) {
    this.storagePackageId = storagePackageId;
  }

  getStoragePackageId() {
    return this.storagePackageId;
  }

  deleteStoragePackageId() {
    this.storagePackageId = null;
  }

  constructor(private httpService: HttpService) {}

  addStoragePackage(storagePackage: any) {
    const data = { api: 'newStoragePackage', data: storagePackage };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeStoragePackageStatus(id: string, status: boolean) {
    const data = { api: 'changeStoragePackageStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getStoragePackages() {
    const data = {
      api: 'getStoragePackages',
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

  getStoragePackage(id: string) {
    const data = { api: 'getStoragePackage', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editStoragePackage(storagePackage: StoragePackageModel) {
    const data = { api: 'updateStoragePackage', data: storagePackage };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteStoragePackage(id: string) {
    const data = { api: 'deleteStoragePackage', data: { id } };
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
