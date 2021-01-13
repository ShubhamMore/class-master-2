import { DateService } from './../../../../../services/shared-services/date.service';
import { DiscountAndOfferModel } from './../../../../../models/discount-and-offer.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { DiscountAndOfferService } from './../../../../../services/discount-and-offer.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../../services/branch.service';

@Component({
  selector: 'ngx-add-discount-and-offer',
  templateUrl: './add-discount-and-offer.component.html',
  styleUrls: ['./add-discount-and-offer.component.scss'],
})
export class AddDiscountAndOfferComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  private branchId: string;
  private discountAndOfferId: string;
  discountAndOffer: DiscountAndOfferModel;
  discountAndOfferForm: FormGroup;
  validOfferCode: boolean;
  discountTypes: string[];
  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    private discountAndOfferService: DiscountAndOfferService,
    private toastrService: NbToastrService,

    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      if (param.mode) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.discountAndOfferId = this.discountAndOfferService.getDiscountAndOfferId();

    let mode: string;

    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (mode && !this.discountAndOfferId) {
      this.showToastr('top-right', 'danger', 'Discount And Offer Not Available');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.discountTypes = this.discountAndOfferService.getDiscountTypes();
    this.validOfferCode = true;
    this.discountAndOfferForm = new FormGroup(
      {
        offerName: new FormControl(null, {
          validators: [Validators.required],
        }),
        code: new FormControl(null, {
          validators: [Validators.required],
        }),
        discountType: new FormControl(null, {
          validators: [Validators.required],
        }),
        discountAmount: new FormControl(null, {
          validators: [Validators.required, Validators.min(0)],
        }),
        startDate: new FormControl(null, {
          validators: [Validators.required],
        }),
        expiryDate: new FormControl(null, {
          validators: [],
        }),
        description: new FormControl(null, {
          validators: [],
        }),
        termsAndConditions: new FormControl(null, {
          validators: [],
        }),
      },
      {
        validators: this.discountPercentageValidator.bind(this),
      },
    );

    if (this.discountAndOfferId) {
      this.discountAndOfferService.getDiscountAndOfferForEditing(this.discountAndOfferId).subscribe(
        (discountAndOffer: DiscountAndOfferModel) => {
          if (!discountAndOffer) {
            this.router.navigate(['../page-not-found'], { relativeTo: this.route });
            return;
          }
          this.discountAndOffer = discountAndOffer;
          this.discountAndOfferForm.patchValue({
            offerName: discountAndOffer.offerName,
            code: discountAndOffer.code,
            discountType: discountAndOffer.discountType,
            discountAmount: discountAndOffer.discountAmount,
            startDate: discountAndOffer.startDate,
            expiryDate: discountAndOffer.expiryDate,
            description: discountAndOffer.description,
            termsAndConditions: discountAndOffer.termsAndConditions,
          });

          this.loading = false;
        },
        (err: any) => {
          this.router.navigate(['../page-not-found'], { relativeTo: this.route });
          return;
        },
      );
    } else {
      this.loading = false;
    }
  }

  discountPercentageValidator(group: FormGroup): { [s: string]: boolean } {
    const discountType = group.value.discountType;
    const amount = +group.value.discountAmount;
    if (discountType === 'percentage' && amount > 100) {
      return { invalidDiscountPercentage: true };
    }
    return null;
  }

  checkOfferCode(code: any) {
    if (this.discountAndOffer && this.discountAndOffer.code === code) {
      this.validOfferCode = true;
      return;
    }
    this.discountAndOfferService.CheckDiscountAndOffer(this.branchId, code).subscribe(
      (res: any) => {
        this.validOfferCode = res.status;
      },
      (err: any) => {},
    );
  }

  submitDiscountAndOffer() {
    this.discountAndOfferForm.markAllAsTouched();
    if (this.discountAndOfferForm.invalid) {
      this.showToastr('top-right', 'danger', 'Discount & Offer Details are required');
      return;
    } else if (!this.validOfferCode) {
      this.showToastr('top-right', 'danger', 'This Offer Code Already Exist');
      return;
    }
    this.stepper.next();
  }

  saveDiscountAndOffer() {
    this.discountAndOfferForm.markAllAsTouched();

    if (this.discountAndOfferForm.invalid) {
      this.showToastr('top-right', 'danger', 'Discount & Offer Details are required');
      return;
    } else if (!this.validOfferCode) {
      this.showToastr('top-right', 'danger', 'This Offer Code Already Exist');
      return;
    }
    this.submit = true;

    const discountAndOffer: any = this.discountAndOfferForm.value;
    discountAndOffer.branch = this.branchId;

    if (!this.discountAndOffer) {
      this.discountAndOfferService.addDiscountAndOffer(discountAndOffer).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'New Discount And Offer Added Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    } else {
      discountAndOffer._id = this.discountAndOffer._id;

      this.discountAndOfferService.editDiscountAndOffer(discountAndOffer).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Discount And Offer Updated Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.submit = false;
        },
      );
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.discountAndOfferService.deleteDiscountAndOfferId();
  }
}
