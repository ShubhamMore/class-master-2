import { LeaveCommentComponent } from './leave-comment/leave-comment.component';
import { EmployeeNameIdModel } from './../../../models/branch-employee.model';
import { BranchEmployeeService } from './../../../services/branch-employee.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';
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
    private dialogService: NbDialogService,
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

    this.branchEmployeeService.getBranchAllEmployeeNameIds(this.branchId).subscribe(
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

  getEmployeeName(employee: string) {
    const myEmployee = this.branchEmployees.find(
      (curEmployee: EmployeeNameIdModel) => curEmployee.employee === employee,
    );

    if (myEmployee) {
      return myEmployee.name;
    }

    return '--';
  }

  getLeaveDuration(duration: string, startDate: string, endDate: string, hours: string) {
    if (duration === 'single') {
      return `Single Day Leave on ${this.dateService.formatDate(startDate)}`;
    } else if (duration === 'multiple') {
      return `Multiple Days Leave from ${this.dateService.formatDate(
        startDate,
      )} to ${this.dateService.formatDate(endDate)}`;
    } else if ('hourly') {
      return `Hourly Leave on ${this.dateService.formatDate(startDate)} for ${hours} Hours`;
    } else {
      return duration + ' leave';
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  changeEmployeeLeaveStatus(_id: string, status: string, comment: string) {
    this.loading = true;
    const employeeLeave = {
      _id,
      status,
      comment,
    };

    this.employeeLeaveService.changeEmployeeLeaveStatus(employeeLeave).subscribe(
      (res: any) => {
        this.showToastr('top-right', 'success', `Leave ${status.toUpperCase()} Successfully!`);
        this.getBranchLeaves();
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  openCommentDialog(id: string, status: string) {
    this.dialogService
      .open(LeaveCommentComponent, {
        context: {},
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe((comment: string) => this.changeEmployeeLeaveStatus(id, status, comment));
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
