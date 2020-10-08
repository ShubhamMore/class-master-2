import { CategoryModel } from './../models/branch.model';
import { BranchModel } from '../models/branch.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BranchService {
  private branchId: string;
  private selectedBranchId = new BehaviorSubject<string>(null);
  private categoryId: string;

  private branch = new BehaviorSubject<BranchModel>(null);
  private branches = new BehaviorSubject<BranchModel[]>([]);
  private category = new BehaviorSubject<CategoryModel>(null);
  private categories = new BehaviorSubject<CategoryModel[]>([]);

  setBranchId(branchId: string) {
    this.branchId = branchId;
    this.setSelectedBranchId(branchId);
  }

  deleteBranchId() {
    this.branchId = null;
  }

  getBranchId() {
    return this.branchId;
  }

  setSelectedBranchId(branchId: string) {
    this.selectedBranchId.next(branchId);
  }

  getSelectedBranchId() {
    return this.selectedBranchId;
  }

  setCategoryId(categoryId: string) {
    this.categoryId = categoryId;
  }

  deleteCategoryId() {
    this.categoryId = null;
  }

  getCategoryId() {
    return this.categoryId;
  }

  setBranchData(branch: BranchModel) {
    this.branch.next(branch);
  }

  getBranchData() {
    return this.branch;
  }

  deleteBranchData() {
    this.branch.next(null);
  }

  setBranchesData(branches: BranchModel[]) {
    this.branches.next(branches);
  }

  getBranchesData() {
    return this.branches;
  }

  deleteBranchesData() {
    this.branches.next(null);
  }

  setCategoryData(category: CategoryModel) {
    this.category.next(category);
  }

  getCategoryData() {
    return this.category;
  }

  deleteCategoryData() {
    this.category.next(null);
  }

  setCategoriesData(categories: CategoryModel[]) {
    this.categories.next(categories);
  }

  getCategoriesData() {
    return this.categories;
  }

  deleteCategoriesData() {
    this.categories.next([]);
  }

  constructor(private httpService: HttpService) {}

  getBranches(imsMasterId: any) {
    const data = { api: 'getBranches', data: { imsMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchCoursesAndBatches(branchId: string) {
    const data = { api: 'getBranchCoursesAndBatches', data: { branch: branchId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchesForEmployee(imsMasterId: any) {
    const data = { api: 'getBranches', data: { imsMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchesForStudent(imsMasterId: any) {
    const data = { api: 'getBranches', data: { imsMasterId } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranch(id: string) {
    const data = { api: 'getBranch', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  getBranchForEditing(id: string) {
    const data = { api: 'getBranchForEditing', data: { id } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  addBranch(branch: any) {
    const data = { api: 'newBranch', data: branch };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  editBranch(branch: any) {
    const data = { api: 'updateBranch', data: branch };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  activateBranch(id: string, paymentDetails: any) {
    const data = { api: 'activateBranch', data: { id, paymentDetails } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deactivateBranch(branch: string) {
    const data = { api: 'deactivateBranch', data: { branch } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  changeBranchStatus(id: string, status: boolean) {
    const data = { api: 'changeBranchStatus', data: { id, status } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      }),
    );
  }

  deleteBranch(id: string) {
    const data = { api: 'deleteBranch', data: { id } };
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
