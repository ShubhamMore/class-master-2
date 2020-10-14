import { BudgetService } from './../../../services/budget.service';
import { DateService } from './../../../services/shared-services/date.service';
import { NbToastrService } from '@nebular/theme';
import { DashboardService } from './../../../services/dashboard.service';
import { BranchService } from './../../../services/branch.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface DashboardInfo {
  activeCourses: number;
  inactiveCourses: number;
  activeStudents: number;
  inactiveStudents: number;
  activeEmployees: number;
  inactiveEmployees: number;
  openLeads: number;
  lostLeads: number;
  wonLeads: number;
}
@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  branchId: string;
  dashboardInfo: DashboardInfo;

  currentYear: number;
  year: number;

  constructor(
    private branchService: BranchService,
    private dashboardService: DashboardService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public dateService: DateService,
    public budgetService: BudgetService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }
    this.getDashboardData();

    this.currentYear = +this.dateService.getCurrentYear();
    this.year = +this.dateService.getCurrentYear();
  }

  getDashboardData() {
    this.dashboardService.getBranchDashboard(this.branchId).subscribe(
      (dashboardInfo: DashboardInfo) => {
        this.dashboardInfo = dashboardInfo;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  addStudent() {
    this.router.navigate(['../student/add'], { relativeTo: this.route });
  }

  manageStudent() {
    this.router.navigate(['../student'], {
      relativeTo: this.route,
      queryParams: { type: 'active' },
    });
  }

  addEmployee() {
    this.router.navigate(['../employee/add'], { relativeTo: this.route });
  }

  manageEmployee() {
    this.router.navigate(['../employee'], {
      relativeTo: this.route,
      queryParams: { type: 'active' },
    });
  }

  addCourse() {
    this.router.navigate(['../manage-branch/course/add'], { relativeTo: this.route });
  }

  manageCourse() {
    this.router.navigate(['../manage-branch/course'], { relativeTo: this.route });
  }

  addLead() {
    this.router.navigate(['../lead/add'], { relativeTo: this.route });
  }

  manageLead() {
    this.router.navigate(['../lead'], { relativeTo: this.route, queryParams: { type: 'active' } });
  }

  previousYear() {
    if (this.year >= 2018) {
      this.year--;
    }
  }

  nextYear() {
    if (this.year <= this.currentYear) {
      this.year++;
    }
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
