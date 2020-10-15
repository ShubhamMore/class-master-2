import { BranchStorageModel } from '../../../models/branch-storage.model';
import { StorageService } from './../../../services/shared-services/storage.service';
import { BudgetService } from './../../../services/budget.service';
import { DateService } from './../../../services/shared-services/date.service';
import { NbToastrService, NbThemeService } from '@nebular/theme';
import { DashboardService } from './../../../services/dashboard.service';
import { BranchService } from './../../../services/branch.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface DashboardInfo {
  branchStorage: BranchStorageModel;
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

interface Budget {
  income: { _id: number; amount: number }[];
  expense: { _id: number; amount: number }[];
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

  data: any;
  options: any;
  themeSubscription: any;
  colors: any;

  totalStorage: string;
  usedStorage: string;
  availableStorage: string;
  usedStorageInPercentage: number;

  constructor(
    private branchService: BranchService,
    private dashboardService: DashboardService,
    private toastrService: NbToastrService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    public dateService: DateService,
    public budgetService: BudgetService,
    private themeService: NbThemeService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });
      return;
    }
    this.currentYear = +this.dateService.getCurrentYear();
    this.year = +this.dateService.getCurrentYear();
    this.getDashboardData();
    this.getBudgetData();

    this.themeSubscription = this.themeService.getJsTheme().subscribe((config: any) => {
      this.colors = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  calculateStorage(branchStorage: BranchStorageModel) {
    const totalStorage: any = this.storageService.convertByteToUnit(
      branchStorage.totalStorageAssigned,
    );
    const usedStorage: any = this.storageService.convertByteToUnit(branchStorage.totalStorageUsed);

    const availableStorage: any = this.storageService.convertByteToUnit(
      branchStorage.totalStorageAssigned - branchStorage.totalStorageUsed,
    );

    this.totalStorage = totalStorage.value.toFixed(1) + ' ' + totalStorage.unit;
    this.usedStorage = usedStorage.value.toFixed(1) + ' ' + usedStorage.unit;
    this.availableStorage = availableStorage.value.toFixed(1) + ' ' + availableStorage.unit;

    // tslint:disable-next-line: radix
    this.usedStorageInPercentage = parseInt(
      ((branchStorage.totalStorageUsed * 100) / branchStorage.totalStorageAssigned).toFixed(1),
    );
  }

  getDashboardData() {
    this.dashboardService.getBranchDashboard(this.branchId).subscribe(
      (dashboardInfo: DashboardInfo) => {
        this.dashboardInfo = dashboardInfo;
        this.calculateStorage(dashboardInfo.branchStorage);
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

  manageBudget() {
    this.router.navigate(['../budget'], { relativeTo: this.route });
  }

  manageClassSchedule() {
    this.router.navigate(['../schedule'], { relativeTo: this.route });
  }

  manageStudentReports() {
    this.router.navigate(['../students-report'], { relativeTo: this.route });
  }

  previousYear() {
    if (this.year >= 2018) {
      this.year--;
      this.getBudgetData();
    }
  }

  nextYear() {
    if (this.year <= this.currentYear) {
      this.year++;
      this.getBudgetData();
    }
  }

  getBudgetData() {
    this.budgetService.getBudgetForBranchDashboard(this.branchId, this.year.toString()).subscribe(
      (budget: Budget) => {
        this.setBarChartData(budget);
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
      },
    );
  }

  setBarChartData(budget: Budget) {
    const income: number[] = [];
    const expense: number[] = [];

    for (let i = 0; i < 12; i++) {
      // Income
      const inc = budget.income.find((curIncome: any) => curIncome._id === i + 1);
      if (inc) {
        income.push(inc.amount);
      } else {
        income.push(0);
      }

      // Expense
      const exp = budget.expense.find((curExpense: any) => curExpense._id === i + 1);
      if (exp) {
        expense.push(exp.amount);
      } else {
        expense.push(0);
      }
    }

    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          data: income,
          label: 'Income',
          backgroundColor: this.colors.warningLight,
        },
        {
          data: expense,
          label: 'Expense',
          backgroundColor: this.colors.dangerLight,
        },
      ],
    };
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
