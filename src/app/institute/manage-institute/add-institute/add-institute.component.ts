import { map } from 'rxjs/operators';
import { CountryService } from './../../../services/shared-services/country.service';
import { environment } from './../../../../environments/environment';
import { PaymentService } from './../../../services/payment.service';
import { AuthService } from './../../../authentication/auth/auth-service/auth.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { BranchService } from './../../../services/branch.service';
import { MenuService } from './../../menu.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BranchModel, CategoryModel } from './../../../models/branch.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ObjectId } from 'bson';
import { Location } from '@angular/common';
import { of, Observable } from 'rxjs';
declare const Razorpay: any;

@Component({
  selector: 'ngx-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.scss'],
})
export class AddInstituteComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  private user: any;

  branchBasicDetailsForm: FormGroup;
  branchAddressForm: FormGroup;
  branchCategoriesForm: FormGroup;

  private branchId: string;
  branch: BranchModel;

  private states: any[];
  private cities: any[];

  filteredStates: Observable<any[]>;
  filteredCities: Observable<any[]>;

  private options: any;
  private razorPay: any;
  private placedOrderReceipt: any;

  paymentDetails: any;
  constructor(
    private menuService: MenuService,
    private countryService: CountryService,
    private authService: AuthService,
    private branchService: BranchService,
    private paymentService: PaymentService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.route.queryParams.subscribe((param: Params) => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.loading = true;

    this.menuService.hideMenu();
    this.user = this.authService.getUserData();
    this.paymentDetails = this.paymentService.getPaymentDetails();

    let mode: string;
    this.route.queryParams.subscribe((param: Params) => {
      mode = param.mode;
    });

    this.branchId = this.branchService.getBranchId();

    if (mode && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Route');
      this.router.navigate(['/institute/page-not-found'], { relativeTo: this.route });
      return;
    } else if ((!this.user || !this.paymentDetails) && mode !== 'edit') {
      this.showToastr('top-right', 'danger', 'Invalid Payment Details');
      this.location.back();
      return;
    } else if (mode === 'edit' && !this.branchId) {
      this.showToastr('top-right', 'danger', 'Branch not Available');
      this.location.back();
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
            this.router.navigate(['/institute/page-not-found'], { relativeTo: this.route });
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
          this.router.navigate(['page-not-found'], { relativeTo: this.route });
          this.loading = false;
        },
      );
    } else {
      this.options = {
        key: environment.razorpayKeyId, // Enter the Key ID generated from the Dashboard
        amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'IMS Master',
        description: 'Test Transaction',
        image: '../../../../assets/brand/class-master-mini.png',
        // tslint:disable-next-line: max-line-length
        order_id: '', // This is a sample Order ID. Pass the `id` obtained in the response of Step 1 order_9A33XWu170gUtm
        handler: (response: any) => {
          this.verifyPayment(response);
        },
        modal: {
          ondismiss: () => {
            this.deleteOrder();
            this.deleteBranch();
          },
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          address: '',
        },
        theme: {
          color: '#528FF0',
        },
      };

      this.razorPay = new Razorpay(this.options);

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

  private generateOrder(order: any) {
    this.paymentService.generateOrder(order).subscribe(
      (res: any) => {
        this.placedOrderReceipt = res.paymentReceipt;
        // this.options.amount = res.order.amount;
        this.options.amount = '1';
        this.options.order_id = res.order.id;
        this.options.currency = res.order.currency;
        this.options.prefill.name = this.user.name;
        this.options.prefill.email = this.user.email;
        this.options.prefill.contact = this.user.phone;
        this.razorPay = new Razorpay(this.options);
        this.pay();
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
      },
    );
  }

  private pay() {
    this.razorPay.open();
  }

  private deleteOrder() {
    this.paymentService.deleteOrder(this.placedOrderReceipt._id).subscribe(
      (res: any) => {
        this.placedOrderReceipt = null;
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
      },
    );
  }

  verifyPayment(payment: any) {
    this.paymentService.verifyPayment(payment, this.placedOrderReceipt).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Payment Verified Successfully');
        this.activateBranch(this.branchId, res.orderId, res.receiptId);
      },
      (err: any) => {
        this.showToastr('top-right', 'danger', err);
      },
    );
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
          const orderDetails = {
            userId: this.user._id,
            userPhone: this.user.phone,
            userName: this.user.name,
            userEmail: this.user.email,
            amount: this.paymentDetails.amount,
            planType: this.paymentDetails.planType,
          };
          this.generateOrder(orderDetails);
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
          this.router.navigate(['/institute']);
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
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
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

  ngOnDestroy() {
    this.branchService.deleteBranchId();
  }
}
