import { SaveLeaveComponent } from './save-leave/save-leave.component';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Month, DateService } from './../../../services/shared-services/date.service';
import { EmployeeLeaveService } from './../../../services/employee-leave.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../services/branch.service';
import { EmployeeLeaveModel } from './../../../models/employee-leave.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.scss'],
})
export class MyLeaveComponent implements OnInit {
  loading: boolean;

  branchId: string;

  pendingLeaves: EmployeeLeaveModel[];
  approvedLeaves: EmployeeLeaveModel[];
  rejectedLeaves: EmployeeLeaveModel[];

  months: Month[];
  month: string;

  years: string[];
  year: string;

  constructor(
    private branchService: BranchService,
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

    this.approvedLeaves = [];
    this.pendingLeaves = [];
    this.rejectedLeaves = [];

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();

    this.month = (this.dateService.getDate().getMonth() + 1).toString().padStart(2, '0');
    this.year = this.years[this.years.length - 1];

    this.getMyLeaves();
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.getMyLeaves();
  }

  onSelectYear(year: string) {
    this.year = year;
    if (year === '') {
      this.month = '';
    }

    this.getMyLeaves();
  }

  getMyLeaves() {
    this.loading = true;
    this.employeeLeaveService.getMyBranchLeaves(this.branchId, this.month, this.year).subscribe(
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

  getLeaveDuration(duration: string, startDate: string, endDate: string, hours: string) {
    if (duration === 'single') {
      return `Single Day Leave on ${this.dateService.formatDate(startDate)}`;
    } else if (duration === 'multiple') {
      return `Multiple Days Leave from ${this.dateService.formatDate(
        startDate,
      )} to ${this.dateService.formatDate(endDate)}`;
    } else if ('hourly') {
      return `Hourly Leave for ${hours} Hours on ${this.dateService.formatDate(startDate)}`;
    } else {
      return duration + ' leave';
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  saveLeave(type: string, leave: EmployeeLeaveModel) {
    if (type === 'new') {
      this.pendingLeaves.push(leave);
    } else {
      const index = this.pendingLeaves.findIndex(
        (curLeave: EmployeeLeaveModel) => curLeave._id === leave._id,
      );
      if (index >= 0) {
        this.pendingLeaves[index] = leave;
      }
    }
  }

  openLeaveDialog() {
    this.dialogService
      .open(SaveLeaveComponent, {
        context: {},
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(
        (myLeave: { type: string; leave: EmployeeLeaveModel }) =>
          myLeave && this.saveLeave(myLeave.type, myLeave.leave),
      );
  }

  createLeave() {
    this.openLeaveDialog();
  }

  editLeave(leave: EmployeeLeaveModel) {
    this.employeeLeaveService.setEmployeeLeaveId(leave._id);
    this.employeeLeaveService.setEmployeeLeaveData(leave);
    this.openLeaveDialog();
  }

  deleteLeave(id: string) {
    this.loading = true;
    this.employeeLeaveService.deleteEmployeeLeave(id).subscribe(
      (res: any) => {
        const index = this.pendingLeaves.findIndex(
          (curLeave: EmployeeLeaveModel) => curLeave._id === id,
        );
        if (index >= 0) {
          this.pendingLeaves.splice(index, 1);
        }
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
}
