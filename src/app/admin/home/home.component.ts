import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';

interface DashboardInfo {
  institutes: number;
  students: number;
  employees: number;
}

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading: boolean;
  dashboardInfo: DashboardInfo;

  constructor(
    private adminService: AdminService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAdminDashboard().subscribe(
      (dashboardInfo: any) => {
        this.dashboardInfo = dashboardInfo;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.router.navigate(['./page-not-found'], { relativeTo: this.route });
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
