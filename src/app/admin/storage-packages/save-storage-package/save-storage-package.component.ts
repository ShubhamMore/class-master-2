import { DateService } from './../../../services/shared-services/date.service';
import { StoragePackageService } from './../../../services/storage-package.service';
import { StoragePackageModel } from '../../../models/storage-package.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-save-storage-package',
  templateUrl: './save-storage-package.component.html',
  styleUrls: ['./save-storage-package.component.scss'],
})
export class SaveStoragePackageComponent implements OnInit, OnDestroy {
  loading: boolean;
  submit: boolean;

  storagePackage: StoragePackageModel;
  storagePackageForm: FormGroup;

  constructor(
    private storagePackageService: StoragePackageService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<SaveStoragePackageComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.storagePackageService
      .getStoragePackageData()
      .subscribe((storagePackage: StoragePackageModel) => {
        this.storagePackageForm = new FormGroup({
          packageName: new FormControl(null, {
            validators: [Validators.required],
          }),
          storage: new FormControl(null, {
            validators: [Validators.required, Validators.min(0)],
          }),
          validity: new FormControl(null, {
            validators: [Validators.required, Validators.min(0)],
          }),
          price: new FormControl(null, {
            validators: [Validators.required, Validators.min(0)],
          }),
        });

        if (storagePackage) {
          this.storagePackage = storagePackage;

          this.storagePackageForm.patchValue({
            packageName: storagePackage.packageName,
            storage: storagePackage.storage,
            validity: storagePackage.validity,
            price: storagePackage.price,
          });
        }

        this.loading = false;
      });
  }

  saveStoragePackage() {
    this.storagePackageForm.markAllAsTouched();

    if (this.storagePackageForm.invalid) {
      this.showToastr('top-right', 'danger', 'StoragePackage Details are required');
      return;
    }

    this.submit = true;

    const storagePackage: any = { ...this.storagePackageForm.value };

    if (!this.storagePackage) {
      this.storagePackageService.saveStoragePackage(storagePackage).subscribe(
        (resStoragePackage: StoragePackageModel) => {
          this.ref.close(resStoragePackage);
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      storagePackage._id = this.storagePackage._id;
      this.storagePackageService.editStoragePackage(storagePackage).subscribe(
        (resStoragePackage: StoragePackageModel) => {
          this.ref.close(resStoragePackage);
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
    this.storagePackageService.setStoragePackageData(null);
  }
}
