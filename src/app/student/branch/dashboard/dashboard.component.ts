import { DateService } from './../../../services/shared-services/date.service';
import { NbToastrService } from '@nebular/theme';
import { DashboardService } from './../../../services/dashboard.service';
import { MenuService } from './../../menu.service';
import { BranchService } from './../../../services/branch.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading: boolean;
  branchId: string;

  pendingInstallments: any[];
  upcomingLectures: any[];

  constructor(
    private branchService: BranchService,
    public dateService: DateService,
    private toastrService: NbToastrService,
    private dashboardService: DashboardService,
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../'], { relativeTo: this.route });

      return;
    }

    this.menuService.showMenu();

    this.upcomingLectures = [];
    this.pendingInstallments = [];

    this.dashboardService.getStudentBranchDashboard(this.branchId).subscribe(
      (res: any) => {
        this.upcomingLectures = res.upComingLectures;
        this.pendingInstallments = res.pendingInstallments;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  getTime(startTime: string, endTime: string) {
    return this.dateService.formatTime(startTime) + ' - ' + this.dateService.formatTime(endTime);
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
