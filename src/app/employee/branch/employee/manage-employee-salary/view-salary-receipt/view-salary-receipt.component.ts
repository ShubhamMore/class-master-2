import { BranchEmployeeService } from './../../../../../services/branch-employee.service';
import { BranchEmployeeModel } from '../../../../../models/branch-employee.model';
import { BranchService } from './../../../../../services/branch.service';
import { InstituteBillingService } from './../../../../../services/billing.service';
import { InstituteBillingModel } from '../../../../../models/institute-billing.model';
import { NbToastrService } from '@nebular/theme';
import { DateService } from './../../../../../services/shared-services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './../../../../../services/employee.service';
import { EmployeeSalaryService } from './../../../../../services/employee-salary.service';
import { EmployeeModel } from '../../../../../models/employee.model';
import { EmployeeSalaryModel } from '../../../../../models/employee-salary.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-view-salary-receipt',
  templateUrl: './view-salary-receipt.component.html',
  styleUrls: ['./view-salary-receipt.component.scss'],
})
export class ViewSalaryReceiptComponent implements OnInit, OnDestroy {
  loading: boolean;
  salary: EmployeeSalaryModel;
  employee: EmployeeModel;
  branchEmployee: BranchEmployeeModel;
  receipt: InstituteBillingModel;
  branchId: string;

  constructor(
    private branchService: BranchService,
    private salaryService: EmployeeSalaryService,
    private employeeService: EmployeeService,
    private branchEmployeeService: BranchEmployeeService,
    public dateService: DateService,
    private router: Router,
    private toastrService: NbToastrService,
    private receiptService: InstituteBillingService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    const branchId = this.branchService.getBranchId();
    if (!branchId) {
      this.back();
      return;
    }

    this.salaryService.getEmployeeSalaryData().subscribe((salary: EmployeeSalaryModel) => {
      this.salary = salary;
    });

    this.employeeService.getEmployeeData().subscribe((employee: EmployeeModel) => {
      this.employee = employee;
    });

    this.branchEmployeeService
      .getBranchEmployeeData()
      .subscribe((branchEmployee: BranchEmployeeModel) => {
        this.branchEmployee = branchEmployee;
      });

    if (!this.salary || !this.employee || !this.branchEmployee) {
      this.showToastr('top-right', 'danger', 'Employee Salary Not Found');
      this.back();
    }

    this.receiptService.getBillingDetails(branchId).subscribe(
      (receipt: InstituteBillingModel) => {
        this.receipt = receipt;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.back();
      },
    );
  }

  totalEarning() {
    let totalEarningAmount: any = 0;
    this.salary.earnings.forEach((earning: any) => {
      totalEarningAmount += +earning.amount;
    });
    return parseFloat(totalEarningAmount).toFixed(2);
  }

  getAmount(amount: any) {
    amount = +amount;
    return amount.toFixed(2).toString() + '/-';
  }

  totalDeduction() {
    let totalDeductionAmount: any = 0;
    this.salary.deductions.forEach((deduction: any) => {
      totalDeductionAmount += +deduction.amount;
    });
    return parseFloat(totalDeductionAmount).toFixed(2);
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  print() {
    window.print();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {}
}
