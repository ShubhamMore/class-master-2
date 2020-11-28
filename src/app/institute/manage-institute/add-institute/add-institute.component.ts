import { PaymentComponent } from './../../payment/payment.component';
import { map } from 'rxjs/operators';
import { CountryService } from './../../../services/shared-services/country.service';
import { PaymentService } from './../../../services/payment.service';
import { NbToastrService, NbStepperComponent, NbDialogService } from '@nebular/theme';
import { BranchService } from './../../../services/branch.service';
import { MenuService } from './../../menu.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BranchModel, CategoryModel } from './../../../models/branch.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ObjectId } from 'bson';

import { of, Observable } from 'rxjs';
import { CheckoutComponent } from '../../checkout/checkout.component';
// declare const Razorpay: any;

@Component({
  selector: 'ngx-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.scss'],
})
export class AddInstituteComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;

  branchBasicDetailsForm: FormGroup;
  branchAddressForm: FormGroup;
  branchCategoriesForm: FormGroup;

  private branchId: string;
  branch: BranchModel;

  private states: any[];
  private cities: any[];

  filteredStates: Observable<any[]>;
  filteredCities: Observable<any[]>;

  paymentDetails: any;
  constructor(
    private menuService: MenuService,
    private countryService: CountryService,
    private branchService: BranchService,
    private paymentService: PaymentService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      if (param.mode) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.loading = true;

    this.menuService.hideMenu();
    this.paymentDetails = this.paymentService.getPaymentDetails();

    let mode: string;
    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    this.branchId = this.branchService.getBranchId();

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    } else if (!mode && !this.paymentDetails) {
      this.showToastr('top-right', 'danger', 'Invalid Payment Details');
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    } else if (mode && !this.branchId) {
      this.showToastr('top-right', 'danger', 'Branch not Available');
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.states = this.countryService.getStates();
    this.cities = [];

    this.branchBasicDetailsForm = new FormGroup({
      branchName: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      }),
    });

    this.branchAddressForm = new FormGroup({
      state: new FormControl(null, {
        validators: [Validators.required],
      }),
      city: new FormControl(null, {
        validators: [Validators.required],
      }),
      address1: new FormControl(null, {
        validators: [Validators.required],
      }),
      address2: new FormControl(null, {
        validators: [],
      }),
      pinCode: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.branchCategoriesForm = new FormGroup({
      categories: new FormArray([]),
    });

    if (this.branchId) {
      this.branchService.getBranchForEditing(this.branchId).subscribe(
        (branch: BranchModel) => {
          if (!branch) {
            this.router.navigate(['../page-not-found'], { relativeTo: this.route });
            return;
          }
          this.branch = branch;
          this.branchBasicDetailsForm.patchValue({
            branchName: this.branch.basicDetails.branchName,
            email: this.branch.basicDetails.email,
            phone: this.branch.basicDetails.phone,
          });

          this.branchAddressForm.patchValue({
            state: this.branch.address.state,
            address1: this.branch.address.address1,
            address2: this.branch.address.address2,
            pinCode: this.branch.address.pinCode,
          });

          this.changeState(this.branch.address.state);

          this.branchAddressForm.patchValue({
            city: this.branch.address.city,
          });

          const categories = this.getCategories();
          categories.controls = [];
          this.branch.categories.forEach((category: CategoryModel) => {
            this.addCategory(category);
          });

          this.loading = false;
        },
        (err: any) => {
          this.router.navigate(['../page-not-found'], { relativeTo: this.route });
          this.loading = false;
        },
      );
    } else {
      this.generateCategory();
      this.loading = false;
    }
  }

  private getCategories() {
    return this.branchCategoriesForm.get('categories') as FormArray;
  }

  private newCategory(categoryData: any) {
    return new FormGroup({
      _id: new FormControl(categoryData._id ? categoryData._id : new ObjectId().toString(), {
        validators: [Validators.required],
      }),
      category: new FormControl(categoryData.category ? categoryData.category : null, {
        validators: [Validators.required],
      }),
      status: new FormControl(categoryData.status, {
        validators: [],
      }),
    });
  }

  private addCategory(category: any) {
    const categories = this.getCategories();
    categories.push(this.newCategory(category));
  }

  generateCategory() {
    const category = {
      _id: new ObjectId().toString(),
      category: '',
      status: true,
    };
    this.addCategory(category);
  }

  deleteCategory(i: number) {
    if (i !== 0) {
      const categories = this.getCategories();
      categories.removeAt(i);
    }
  }

  private filterState(name: string): any[] {
    return this.states.filter((state: any) =>
      state.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  private filterCity(name: string): any[] {
    return this.cities.filter((city: any) => city.name.toLowerCase().includes(name.toLowerCase()));
  }

  private getStateFilteredOptions(name: string): Observable<any[]> {
    return of(name).pipe(map((filterState) => this.filterState(filterState)));
  }

  private getCityFilteredOptions(name: string): Observable<string[]> {
    return of(name).pipe(map((filterCity) => this.filterCity(filterCity)));
  }

  onChangeStateInput(e: any) {
    this.filteredStates = this.getStateFilteredOptions(e);
  }

  onChangeCityInput(e: any) {
    this.filteredCities = this.getCityFilteredOptions(e);
  }

  changeState(name: string) {
    this.cities = this.countryService.getCities(name);
  }

  private activateBranch(id: string, orderId: string, ReceiptId: string) {
    const paymentDetails = {
      amount: this.paymentDetails.amount,
      planType: this.paymentDetails.planType,
      orderId: orderId,
      receiptId: ReceiptId,
    };
    this.branchService.activateBranch(id, paymentDetails).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'New Institute Added Successfully');
        this.router.navigate(['/institute']);
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  submitBasicDetails() {
    this.branchBasicDetailsForm.markAllAsTouched();
    if (this.branchBasicDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Basic details are required');
      return;
    }
    this.stepper.next();
  }

  submitAddress() {
    this.branchAddressForm.markAllAsTouched();
    if (this.branchAddressForm.invalid) {
      this.showToastr('top-right', 'danger', 'Address details are required');

      return;
    }
    this.stepper.next();
  }

  submitCategories() {
    this.branchCategoriesForm.markAllAsTouched();
    if (this.branchCategoriesForm.invalid) {
      this.showToastr('top-right', 'danger', 'At least 1 Category is required');
      return;
    }
    this.stepper.next();
  }

  onClosePayment(order: any) {
    if (order.status) {
      this.activateBranch(this.branchId, order.order, order.receipt);
    } else {
      this.deleteBranch();
    }
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
    } else {
      this.deleteBranch();
    }
  }

  saveBranch() {
    this.branchBasicDetailsForm.markAllAsTouched();
    this.branchAddressForm.markAllAsTouched();
    this.branchCategoriesForm.markAllAsTouched();

    if (this.branchBasicDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Basic details are required');
      return;
    } else if (this.branchAddressForm.invalid) {
      this.showToastr('top-right', 'danger', 'Address details are required');

      return;
    } else if (this.branchCategoriesForm.invalid) {
      this.showToastr('top-right', 'danger', 'At least 1 Category is required');
      return;
    }

    const branch: any = {
      basicDetails: this.branchBasicDetailsForm.value,
      address: this.branchAddressForm.value,
      categories: this.branchCategoriesForm.value.categories,
    };
    if (!this.branch) {
      this.branchService.addBranch(branch).subscribe(
        (res: any) => {
          this.branchId = res.branchId;
          this.branchService.setBranchId(this.branchId);

          this.dialogService
            .open(CheckoutComponent, {
              context: {},
              closeOnBackdropClick: false,
              closeOnEsc: false,
            })
            .onClose.subscribe((checkout: any) => checkout && this.onCheckout(checkout));
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
        },
      );
    } else {
      branch._id = this.branch._id;
      this.branchService.editBranch(branch).subscribe(
        (res: any) => {
          this.showToastr('top-right', 'success', 'Branch Updated Successfully!');
          this.back();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
        },
      );
    }
  }

  private deleteBranch() {
    if (this.branchId) {
      this.branchService.deleteBranch(this.branchId).subscribe(
        (res: any) => {
          this.branchId = null;
          this.branchService.deleteBranchId();
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
        },
      );
    }
  }

  getCategoriesData() {
    const categories: string[] = [];
    this.branchCategoriesForm.value.categories.forEach((category: CategoryModel) => {
      categories.push(category.category);
    });

    return categories.join(', ');
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
    this.branchService.deleteBranchId();
    this.paymentService.deletePaymentDetails();
  }
}
