import { SaveSmsPackageComponent } from './save-sms-package/save-sms-package.component';
import { SMSPackageModel } from './../../models/sms-package.model';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { SMSPackageService } from './../../services/sms-package.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-sms-packages',
  templateUrl: './sms-packages.component.html',
  styleUrls: ['./sms-packages.component.scss'],
})
export class SmsPackagesComponent implements OnInit {
  loading: boolean;

  smsPackages: SMSPackageModel[];

  constructor(
    private smsPackageService: SMSPackageService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.smsPackages = [];

    this.getSMSPackages();
  }

  getSMSPackages() {
    this.loading = true;
    this.smsPackageService.getSMSPackages().subscribe(
      (smsPackages: SMSPackageModel[]) => {
        this.smsPackages = smsPackages;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  openSMSPackageDialog() {
    this.dialogService
      .open(SaveSmsPackageComponent, {
        context: {},
      })
      .onClose.subscribe((smsPackage: any) => smsPackage && this.getSMSPackages());
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString();
  }

  editSMSPackage(smsPackage: SMSPackageModel) {
    this.smsPackageService.setSMSPackageData(smsPackage);
    this.openSMSPackageDialog();
  }

  changeSMSPackageStatus(smsPackage: string, status: boolean, i: number) {
    this.loading = true;

    this.smsPackageService.changeSMSPackageStatus(smsPackage, status).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'SMS Package Status Updated Successfully');
        this.smsPackages[i].status = status;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  deleteSMSPackage(smsPackage: string, i: number) {
    this.loading = true;

    this.smsPackageService.deleteSMSPackage(smsPackage).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'SMS Package Deleted Successfully');
        this.smsPackages.splice(i, 1);
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
