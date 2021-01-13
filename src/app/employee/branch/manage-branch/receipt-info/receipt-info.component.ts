import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  submit: boolean;

  branchId: string;
  billingForm: FormGroup;
  billingDetails: InstituteBillingModel;

  constructor(
    private branchService: BranchService,
    private toastrService: NbToastrService,
    private billingService: InstituteBillingService,

    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

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

    this.submit = true;

    const billingDetails: any = this.billingForm.value;
    billingDetails.branch = this.branchId;
    if (this.billingDetails) {
      billingDetails._id = this.billingDetails._id;
    }
    this.billingService.saveBillingDetails(billingDetails).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Billing Details Updated Successfully!');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.submit = false;
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
