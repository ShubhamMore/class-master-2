import { EmployeeModel } from './../../../../../models/employee.model';
import { BranchService } from './../../../../../services/branch.service';
import { EmployeeSalaryModel } from './../../../../../models/employee-salary.model';
import { DateService, Month } from './../../../../../services/shared-services/date.service';
import { EmployeeService } from './../../../../../services/employee.service';
import { EmployeeSalaryService } from './../../../../../services/employee-salary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BranchEmployeeService } from '../../../../../services/branch-employee.service';

@Component({
  selector: 'ngx-manage-salary',
  templateUrl: './manage-salary.component.html',
  styleUrls: ['./manage-salary.component.scss'],
})
export class ManageSalaryComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  employee: EmployeeModel;
  employeeSalaries: EmployeeSalaryModel[];

  months: Month[];
  month: string;

  years: string[];
  year: string;

  constructor(
    private toastrService: NbToastrService,
    public dateService: DateService,
    private employeeService: EmployeeService,
    private employeeSalaryService: EmployeeSalaryService,
    private branchEmployeeService: BranchEmployeeService,
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

    this.employeeService.getEmployeeData().subscribe((employee: EmployeeModel) => {
      this.employee = employee;
    });

    if (!this.employee) {
      this.showToastr('top-right', 'danger', 'Employee Not Found');
      this.back();
      return;
    }

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

    this.employeeSalaryService
      .getBranchEmployeeSalaries(this.branchId, this.employee._id, this.month, this.year)
      .subscribe(
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

  addEmployeeSalary() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  editEmployeeSalary(employeeSalary: EmployeeSalaryModel) {
    this.employeeSalaryService.setEmployeeSalaryId(employeeSalary._id);
    this.employeeSalaryService.setEmployeeSalaryData(employeeSalary);
    this.router.navigate(['./edit'], { relativeTo: this.route, queryParams: { mode: 'edit' } });
  }

  deleteEmployeeSalary(employeeSalary: string, i: number) {
    this.loading = true;
    this.employeeSalaryService.deleteEmployeeSalary(employeeSalary).subscribe(
      (res: any) => {
        this.employeeSalaries.splice(i, 1);
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  changeEmployeeSalaryStatus(employeeSalary: string, status: boolean, i: number) {
    this.loading = true;
    this.employeeSalaryService.changeEmployeeSalaryStatus(employeeSalary, status).subscribe(
      (res: any) => {
        this.employeeSalaries[i].status = status;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
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

  ngOnDestroy() {}
}
