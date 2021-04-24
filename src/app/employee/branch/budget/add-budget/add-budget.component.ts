import { NbStepperComponent, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DateService } from './../../../../services/shared-services/date.service';
import { BranchService } from './../../../../services/branch.service';
import { BudgetService } from './../../../../services/budget.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
})
export class AddBudgetComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  private branchId: string;

  budgetForm: FormGroup;

  constructor(
    private budgetService: BudgetService,
    private branchService: BranchService,
    private toastrService: NbToastrService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.budgetForm = new FormGroup({
      type: new FormControl('income', {
        validators: [Validators.required],
      }),
      generatedBy: new FormControl(null, {
        validators: [Validators.required],
      }),
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      amount: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)],
      }),
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
    });
  }

  previousStep() {
    this.stepper.previous();
  }

  budgetFormSubmit() {
    this.budgetForm.markAllAsTouched();
    if (this.budgetForm.invalid) {
      this.showToastr('top-right', 'danger', 'Please Fill All data Correctly');
      return;
    }
    this.stepper.next();
  }

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }

  saveBudget() {
    if (this.budgetForm.invalid) {
      this.showToastr('top-right', 'danger', 'Please Fill All data Correctly');
      return;
    }
    this.submit = true;

    const budget: any = this.budgetForm.value;
    budget.branch = this.branchId;

    this.budgetService.saveBudget(budget).subscribe(
      (res: any) => {
        this.back();
      },
      (error: any) => {
        this.submit = false;
        this.showToastr('top-right', 'danger', error);
      },
    );
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
}
