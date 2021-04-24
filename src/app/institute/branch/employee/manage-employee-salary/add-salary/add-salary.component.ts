import { EmployeeSalaryService } from './../../../../../services/employee-salary.service';
import { DateService, Month } from './../../../../../services/shared-services/date.service';
import { BranchEmployeeService } from './../../../../../services/branch-employee.service';
import { EmployeeService } from './../../../../../services/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeModel } from '../../../../../models/employee.model';
import { BranchEmployeeModel } from '../../../../../models/branch-employee.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchService } from './../../../../../services/branch.service';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { numberToWords } from '../../../../../shared/numberToWords';

@Component({
  selector: 'ngx-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss'],
})
export class AddSalaryComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  loading: boolean;
  submit: boolean;

  private branchId: string;

  employee: EmployeeModel;
  branchEmployee: BranchEmployeeModel;

  salaryForm: FormGroup;
  ernDeductForm: FormGroup;
  paymentDetailsForm: FormGroup;

  ernDeduction: boolean;
  earnings: any[];
  deductions: any[];
  months: Month[];
  years: string[];

  constructor(
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private branchEmployeeService: BranchEmployeeService,
    private employeeSalaryService: EmployeeSalaryService,
    public dateService: DateService,
    private toastrService: NbToastrService,
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

    this.employeeService.getEmployeeData().subscribe((employee: EmployeeModel) => {
      this.employee = employee;
    });

    this.branchEmployeeService
      .getBranchEmployeeData()
      .subscribe((branchEmployee: BranchEmployeeModel) => {
        this.branchEmployee = branchEmployee;
      });

    this.ernDeduction = true;
    this.earnings = [
      {
        description: 'Basic Amount',
        amount: parseFloat(this.branchEmployee.basicSalary),
      },
    ];
    this.deductions = [];

    this.years = this.dateService.getYears();
    this.months = this.dateService.getMonths();

    this.salaryForm = new FormGroup({
      date: new FormControl(this.dateService.getDateString(), {
        validators: [Validators.required],
      }),
      month: new FormControl(this.dateService.getCurrentMonth(), {
        validators: [Validators.required],
      }),
      year: new FormControl(this.dateService.getCurrentYear(), {
        validators: [Validators.required],
      }),
      basicAmount: new FormControl(this.branchEmployee.basicSalary, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [],
      }),
    });

    this.salaryForm.get('basicAmount').disable();

    this.ernDeductForm = new FormGroup({
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      amount: new FormControl(0, {
        validators: [Validators.required, Validators.min(0)],
      }),
    });

    this.paymentDetailsForm = new FormGroup({
      generatedBy: new FormControl(null, {
        validators: [Validators.required],
      }),
      paymentMode: new FormControl('', { validators: [Validators.required] }),
      bankDetails: new FormControl(null, { validators: [] }),
      transactionDetails: new FormControl(null, { validators: [] }),
    });

    this.loading = false;
  }

  ernDeductChange(ernDeduction: any) {
    if (ernDeduction === '0') {
      this.ernDeduction = true;
    } else {
      this.ernDeduction = false;
    }
  }

  addErnDeduct() {
    if (this.ernDeductForm.invalid) {
      this.showToastr(
        'top-right',
        'danger',
        `Enter Valid ${this.ernDeduction ? 'Earning' : 'Deduction'} Details`,
      );
      return;
    }

    const extras: any = {
      description: this.ernDeductForm.value.description,
      amount: parseFloat(this.ernDeductForm.value.amount),
    };
    if (this.ernDeduction) {
      this.earnings.push(extras);
    } else {
      this.deductions.push(extras);
    }
    this.ernDeductForm.reset({ amount: '0' });
  }

  deleteErnDeduct(ernDeduct: boolean, i: number) {
    if (ernDeduct) {
      if (i === 0) {
        return;
      }
      this.earnings.splice(i, 1);
    } else {
      this.deductions.splice(i, 1);
    }
  }

  totalEarning() {
    let totalEarningAmount: any = 0;
    this.earnings.forEach((earning) => {
      totalEarningAmount += +earning.amount;
    });
    return parseFloat(totalEarningAmount);
  }

  totalDeduction() {
    let totalDeductionAmount: any = 0;
    this.deductions.forEach((deduction) => {
      totalDeductionAmount += +deduction.amount;
    });
    return parseFloat(totalDeductionAmount);
  }

  getNetSalary() {
    const totalEarnings = +this.totalEarning();
    const totalDeductions = +this.totalDeduction();
    const netSalary: number = totalEarnings - totalDeductions;
    return netSalary;
  }

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }

  getNetSalaryInWords() {
    const netSalary: number = +this.getNetSalary();
    return numberToWords(netSalary) + ' Only/-';
  }

  previousStep() {
    if (this.stepper.selectedIndex === 1) {
      this.salaryForm.get('basicAmount').disable();
    }
    this.stepper.previous();
  }

  salaryFormSubmit() {
    this.salaryForm.markAllAsTouched();
    if (this.salaryForm.invalid) {
      this.showToastr('top-right', 'danger', 'Employee Salary Details are Required');
      return;
    }
    this.stepper.next();
    this.salaryForm.get('basicAmount').enable();
  }

  ernDeductFormSubmit() {
    this.stepper.next();
  }

  paymentDetailsFormSubmit() {
    this.paymentDetailsForm.markAllAsTouched();
    if (this.paymentDetailsForm.invalid) {
      this.showToastr('top-right', 'danger', 'Enter Valid Payment Details');
      return;
    }
    this.stepper.next();
  }

  saveEmployee() {
    this.salaryForm.markAllAsTouched();

    if (this.salaryForm.invalid) {
      this.showToastr('top-right', 'danger', 'Employee Salary Details are Required');
      return;
    }

    this.submit = true;

    const employeeSalary: any = {
      branch: this.branchId,
      employee: this.employee.imsMasterId,
      role: this.branchEmployee.role,
      ...this.salaryForm.value,
      earnings: this.earnings,
      deductions: this.deductions,
      ...this.paymentDetailsForm.value,
      netSalary: this.getNetSalary(),
      netSalaryInWords: this.getNetSalaryInWords(),
    };

    this.employeeSalaryService.addEmployeeSalary(employeeSalary).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', 'Employee Salary Added Successfully');
        this.back();
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.submit = false;
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
    const type = this.employeeService.getEmployeeType();
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { type } });
  }

  ngOnDestroy() {
    this.employeeService.deleteEmployeeId();
    this.branchEmployeeService.deleteBranchEmployeeId();
  }
}
