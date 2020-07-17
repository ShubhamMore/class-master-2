import { BatchModel } from '../models/batch.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BatchService {
  private batch: BatchModel;
  private batchId: string;

  setBatchId(batchId: string) {
    this.batchId = batchId;
  }

  getBatchId() {
    return this.batchId;
  }

  deleteBatchId() {
    this.batchId = null;
  }

  setBatchData(batch: BatchModel) {
    this.batch = batch;
  }

  getBatchData() {
    return this.batch;
  }

  deleteBatchData() {
    this.batch = null;
  }

  constructor(private httpService: HttpService) {}

  getBatches(branch: string, category: string, course: any) {
    const data = { api: 'getBatches', data: { branch, category, course } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBatch(id: string) {
    const data = { api: 'getBatch', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBatchForEditing(id: string) {
    const data = { api: 'getBatchForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addBatch(batch: any) {
    const data = { api: 'newBatch', data: batch };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editBatch(batch: any) {
    const data = { api: 'updateBatch', data: batch };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteBatch(id: string) {
    const data = { api: 'deleteBatch', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeBatchStatus(id: string, status: boolean) {
    const data = { api: 'changeBatchStatus', data: { id, status } };
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
