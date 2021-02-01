import { SaveStoragePackageComponent } from './save-storage-package/save-storage-package.component';
import { StoragePackageModel } from './../../models/storage-package.model';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { StoragePackageService } from './../../services/storage-package.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-storage-packages',
  templateUrl: './storage-packages.component.html',
  styleUrls: ['./storage-packages.component.scss'],
})
export class StoragePackagesComponent implements OnInit {
  loading: boolean;

  storagePackages: StoragePackageModel[];

  constructor(
    private storagePackageService: StoragePackageService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.storagePackages = [];

    this.getStoragePackages();
  }

  getStoragePackages() {
    this.loading = true;
    this.storagePackageService.getStoragePackages().subscribe(
      (storagePackages: StoragePackageModel[]) => {
        this.storagePackages = storagePackages;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  openStoragePackageDialog() {
    this.dialogService
      .open(SaveStoragePackageComponent, {
        context: {},
      })
      .onClose.subscribe((storagePackage: any) => storagePackage && this.getStoragePackages());
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString();
  }

  editStoragePackage(storagePackage: StoragePackageModel) {
    this.storagePackageService.setStoragePackageData(storagePackage);
    this.openStoragePackageDialog();
  }

  changeStoragePackageStatus(storagePackage: string, status: boolean, i: number) {
    this.loading = true;

    this.storagePackageService.changeStoragePackageStatus(storagePackage, status).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Storage Package Status Updated Successfully');
        this.storagePackages[i].status = status;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  deleteStoragePackage(storagePackage: string, i: number) {
    this.loading = true;

    this.storagePackageService.deleteStoragePackage(storagePackage).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Storage Package Deleted Successfully');
        this.storagePackages.splice(i, 1);
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
