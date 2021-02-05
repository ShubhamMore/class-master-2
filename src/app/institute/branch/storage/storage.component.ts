import { CheckoutComponent } from './../../checkout/checkout.component';
import { PaymentComponent } from './../../payment/payment.component';
import { PaymentService } from './../../../services/payment.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
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
  branchId: string;

  branchStorage: BranchStorageModel;
  storagePackages: StoragePackageModel[];

  totalStorage: string;
  usedStorage: string;
  availableStorage: string;
  usedStorageInPercentage: number;

  paymentDetails: { planType: string; packageType: string; amount: string };

  constructor(
    private branchService: BranchService,
    private dialogService: NbDialogService,
    private paymentService: PaymentService,
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

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.branchStorageService.getBranchStorage(this.branchId).subscribe(
      (branchStorage: BranchStorageModel) => {
        this.branchStorage = branchStorage;
        this.calculateStorage(branchStorage);

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
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  onClosePayment(order: any) {
    if (order.status) {
      this.updateStorage(order.order, order.receipt);
    }
  }

  updateStorage(order: string, receipt: string) {
    this.branchStorageService
      .updateBranchStorage(this.branchId, this.paymentDetails.packageType, order, receipt)
      .subscribe(
        (res: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
        },
      );
  }

  isUpgradable(storagePackage: StoragePackageModel) {
    if (!this.branchStorage.storagePackage) {
      return false;
    } else if (storagePackage.packageName > this.branchStorage.storagePackage) {
      return false;
    } else {
      return true;
    }
  }

  upgradeAmount(price: number) {
    const remainingDays = this.dateService.dateDifferenceInDays(
      this.dateService.getDateString(),
      this.branchStorage.extraStorageExpireOn,
    );

    const branchStoragePackage = this.storagePackages.find(
      (storage: StoragePackageModel) => storage.packageName === this.branchStorage.storagePackage,
    );

    const remainingAmount =
      (+branchStoragePackage.price / +branchStoragePackage.validity) * +remainingDays;

    const upgradableAmount = this.getAmount(Math.round(+(price - remainingAmount) * 1.1));

    return upgradableAmount.toString();
  }

  onCheckout(checkout: any) {
    if (checkout.status) {
      this.dialogService
        .open(PaymentComponent, {
          context: {},
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
        .onClose.subscribe((order: any) => order && this.onClosePayment(order));
    }
  }

  activate(storagePackage: StoragePackageModel) {
    const amount: string =
      this.branchStorage.storagePackage &&
      storagePackage.packageName > this.branchStorage.storagePackage
        ? this.upgradeAmount(storagePackage.price)
        : storagePackage.price.toString();

    const type =
      this.branchStorage.storagePackage &&
      storagePackage.packageName > this.branchStorage.storagePackage
        ? 'upgrade'
        : 'new';

    this.paymentService.setPaymentDetails('storage', storagePackage.packageName, amount, type);

    this.paymentDetails = this.paymentService.getPaymentDetails();
    this.dialogService
      .open(CheckoutComponent, {
        context: {},
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((checkout: any) => checkout && this.onCheckout(checkout));
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

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
