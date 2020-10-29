import { EmployeeNameIdModel } from './../../../models/branch-employee.model';
import { BranchEmployeeService } from './../../../services/branch-employee.service';
import { NbToastrService } from '@nebular/theme';
import { Month, DateService } from './../../../services/shared-services/date.service';
import { EmployeeLeaveService } from './../../../services/employee-leave.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../services/branch.service';
import { EmployeeLeaveModel } from './../../../models/employee-leave.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss'],
})
export class LeaveComponent implements OnInit {
  loading: boolean;

  branchId: string;

  branchEmployees: EmployeeNameIdModel[];
  employee: string;

  pendingLeaves: EmployeeLeaveModel[];
  approvedLeaves: EmployeeLeaveModel[];
  rejectedLeaves: EmployeeLeaveModel[];

  months: Month[];
  month: string;

  years: string[];
  year: string;

  constructor(
    private branchService: BranchService,
    private branchEmployeeService: BranchEmployeeService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeLeaveService: EmployeeLeaveService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.branchId = this.branchService.getBranchId();

    if (!this.branchId) {
      this.back();
      return;
    }

    this.branchEmployees = [];
    this.employee = '';

    this.approvedLeaves = [];
    this.pendingLeaves = [];
    this.rejectedLeaves = [];

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.branchEmployeeService.getBranchEmployeeNameIds(this.branchId, 'active').subscribe(
      (branchEmployees: EmployeeNameIdModel[]) => {
        this.branchEmployees = branchEmployees;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );

    this.getBranchLeaves();
  }

  onSelectEmployee(employee: string) {
    this.employee = employee;
    this.getBranchLeaves();
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getBranchLeaves();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }
    this.getBranchLeaves();
  }

  getBranchLeaves() {
    this.loading = true;
    this.employeeLeaveService
      .getBranchAllEmployeeLeaves(this.branchId, this.employee, this.month, this.year)
      .subscribe(
        (leaves: EmployeeLeaveModel[]) => {
          this.pendingLeaves = leaves.filter(
            (leave: EmployeeLeaveModel) => leave.status === 'pending',
          );
          this.approvedLeaves = leaves.filter(
            (leave: EmployeeLeaveModel) => leave.status === 'approved',
          );
          this.rejectedLeaves = leaves.filter(
            (leave: EmployeeLeaveModel) => leave.status === 'rejected',
          );
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top-right', 'danger', error);
          this.loading = false;
        },
      );
  }

  viewEmployeeLeave(employeeLeave: EmployeeLeaveModel) {
    this.employeeLeaveService.setEmployeeLeaveId(employeeLeave._id);
    this.employeeLeaveService.setEmployeeLeaveData(employeeLeave);
  }

  getEmployeeName(employee: string) {
    const myEmployee = this.branchEmployees.find(
      (curEmployee: EmployeeNameIdModel) => curEmployee.employee === employee,
    );

    if (myEmployee) {
      return myEmployee.name;
    }

    return '--';
  }

  getLeaveDuration(duration: string, startDate: string, endDate: string, hours: string) {}

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  changeLeaveStatus(id: string, status: string) {}

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
