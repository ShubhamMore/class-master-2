import { BranchService } from './../../../../services/branch.service';
import { EmployeeSalaryModel } from '../../../../models/employee-salary.model';
import { DateService, Month } from './../../../../services/shared-services/date.service';
import { EmployeeSalaryService } from './../../../../services/employee-salary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-manage-salary',
  templateUrl: './manage-salary.component.html',
  styleUrls: ['./manage-salary.component.scss'],
})
export class ManageSalaryComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  employeeSalaries: EmployeeSalaryModel[];

  months: Month[];
  month: string;

  years: string[];
  year: string;

  constructor(
    private toastrService: NbToastrService,
    public dateService: DateService,
    private employeeSalaryService: EmployeeSalaryService,
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.back();
      return;
    }

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.getEmployeeSalary();
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getEmployeeSalary();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.getEmployeeSalary();
  }

  getEmployeeSalary() {
    this.loading = true;

    this.employeeSalaryService.getMyBranchSalaries(this.branchId, this.month, this.year).subscribe(
      (employeeSalaries: EmployeeSalaryModel[]) => {
        this.employeeSalaries = employeeSalaries;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  viewEmployeeSalary(employeeSalary: EmployeeSalaryModel) {
    this.employeeSalaryService.setEmployeeSalaryId(employeeSalary._id);
    this.employeeSalaryService.setEmployeeSalaryData(employeeSalary);
    this.router.navigate(['../view'], { relativeTo: this.route });
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString() + '/-';
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {}
}
