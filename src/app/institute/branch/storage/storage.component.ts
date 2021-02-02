import { NbToastrService } from '@nebular/theme';
import { DateService } from './../../../services/shared-services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchStorageService } from './../../../services/branch-storage.service';
import { BranchService } from './../../../services/branch.service';
import { StoragePackageService } from './../../../services/storage-package.service';
import { StoragePackageModel } from './../../../models/storage-package.model';
import { BranchStorageModel } from './../../../models/branch-storage.model';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/shared-services/storage.service';

@Component({
  selector: 'ngx-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  loading: boolean;
  loadingPackages: boolean;
  branchId: string;

  branchStorage: BranchStorageModel;
  storagePackages: StoragePackageModel[];

  totalStorage: string;
  usedStorage: string;
  availableStorage: string;
  usedStorageInPercentage: number;

  constructor(
    private branchService: BranchService,
    private storageService: StorageService,
    private storagePackageService: StoragePackageService,
    private branchStorageService: BranchStorageService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dateService: DateService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadingPackages = true;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.branchStorageService.getBranchStorage(this.branchId).subscribe(
      (branchStorage: BranchStorageModel) => {
        this.branchStorage = branchStorage;
        this.calculateStorage(branchStorage);

        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );

    this.storagePackageService.getStoragePackages().subscribe(
      (storagePackages: StoragePackageModel[]) => {
        this.storagePackages = storagePackages;
        this.loadingPackages = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loadingPackages = false;
      },
    );
  }

  convertByteToUnit(bytes: any) {
    const storage: any = this.storageService.convertByteToUnit(bytes);
    return storage.value.toFixed(1) + ' ' + storage.unit;
  }

  calculateStorageSize(storage: any) {
    const storageInBytes = this.storageService.convertUnitToBytes(storage, 'MB');
    const storageSizeWithUnit = this.storageService.convertByteToUnit(storageInBytes);
    return storageSizeWithUnit.value.toFixed(1) + ' ' + storageSizeWithUnit.unit;
  }

  calculateStorage(branchStorage: BranchStorageModel) {
    const totalStorage: any = this.storageService.convertByteToUnit(
      branchStorage.totalStorageAssigned,
    );
    const usedStorage: any = this.storageService.convertByteToUnit(branchStorage.totalStorageUsed);

    const availableStorage: any = this.storageService.convertByteToUnit(
      branchStorage.totalStorageAssigned - branchStorage.totalStorageUsed,
    );

    this.totalStorage = totalStorage.value.toFixed(1) + ' ' + totalStorage.unit;
    this.usedStorage = usedStorage.value.toFixed(1) + ' ' + usedStorage.unit;
    this.availableStorage = availableStorage.value.toFixed(1) + ' ' + availableStorage.unit;

    // tslint:disable-next-line: radix
    this.usedStorageInPercentage = parseInt(
      ((branchStorage.totalStorageUsed * 100) / branchStorage.totalStorageAssigned).toFixed(1),
    );
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString();
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  activate(storagePackage: StoragePackageModel) {}

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
