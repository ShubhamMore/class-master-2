import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../services/branch.service';
import { Location } from '@angular/common';
import { NbToastrService } from '@nebular/theme';
import { InstituteBillingService } from './../../../../services/billing.service';
import { InstituteBillingModel } from './../../../../models/institute-billing.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-receipt-info',
  templateUrl: './receipt-info.component.html',
  styleUrls: ['./receipt-info.component.scss'],
})
export class ReceiptInfoComponent implements OnInit {
  loading: boolean;
  branchId: string;
  billingForm: FormGroup;
  billingDetails: InstituteBillingModel;

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private billingService: InstituteBillingService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.location.back();
      return;
    }

    this.billingForm = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(5)] }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      gstNumber: new FormControl(null, { validators: [] }),
      termsAndConditions: new FormControl(null, { validators: [] }),
    });

    this.getBillingDetails();
  }

  getBillingDetails() {
    this.billingService.getBillingDetails(this.branchId).subscribe(
      (res: any) => {
        this.billingDetails = res;
        if (this.billingDetails) {
          this.billingForm.patchValue({
            name: this.billingDetails.name,
            address: this.billingDetails.address,
            gstNumber: this.billingDetails.gstNumber,
            termsAndConditions: this.billingDetails.termsAndConditions,
          });
        }
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      },
    );
  }

  saveBillingDetails() {
    this.billingForm.markAllAsTouched();
    if (this.billingForm.invalid) {
      this.showToastr('top-right', 'danger', 'Fill Billing Details Correctly');
      return;
    }
    this.loading = true;
    const billingDetails: any = this.billingForm.value;
    billingDetails.branch = this.branchId;
    if (this.billingDetails) {
      billingDetails._id = this.billingDetails._id;
    }
    this.billingService.saveBillingDetails(billingDetails).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Billing Details Updated Successfully!');
        this.location.back();
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
