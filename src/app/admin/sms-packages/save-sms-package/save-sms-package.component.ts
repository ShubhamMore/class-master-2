import { SMSPackageService } from './../../../services/sms-package.service';
import { SMSPackageModel } from './../../../models/sms-package.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-save-sms-package',
  templateUrl: './save-sms-package.component.html',
  styleUrls: ['./save-sms-package.component.scss'],
})
export class SaveSmsPackageComponent implements OnInit, OnDestroy {
  loading: boolean;
  submit: boolean;

  smsPackage: SMSPackageModel;
  smsPackageForm: FormGroup;

  constructor(
    private smsPackageService: SMSPackageService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<SaveSmsPackageComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.smsPackageService.getSMSPackageData().subscribe((smsPackage: SMSPackageModel) => {
      this.smsPackageForm = new FormGroup({
        packageName: new FormControl(null, {
          validators: [Validators.required],
        }),
        smsCount: new FormControl(null, {
          validators: [Validators.required, Validators.min(0)],
        }),
        price: new FormControl(null, {
          validators: [Validators.required, Validators.min(0)],
        }),
      });

      if (smsPackage) {
        this.smsPackage = smsPackage;

        this.smsPackageForm.patchValue({
          packageName: smsPackage.packageName,
          smsCount: smsPackage.smsCount,
          price: smsPackage.price,
        });
      }

      this.loading = false;
    });
  }

  saveSMSPackage() {
    this.smsPackageForm.markAllAsTouched();

    if (this.smsPackageForm.invalid) {
      this.showToastr('top-right', 'danger', 'SMSPackage Details are required');
      return;
    }

    this.submit = true;

    const smsPackage: any = { ...this.smsPackageForm.value };

    if (!this.smsPackage) {
      this.smsPackageService.saveSMSPackage(smsPackage).subscribe(
        (resSMSPackage: SMSPackageModel) => {
          this.ref.close(resSMSPackage);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      smsPackage._id = this.smsPackage._id;
      this.smsPackageService.editSMSPackage(smsPackage).subscribe(
        (resSMSPackage: SMSPackageModel) => {
          this.ref.close(resSMSPackage);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
  }

  onClose() {
    this.ref.close();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.smsPackageService.setSMSPackageData(null);
  }
}
