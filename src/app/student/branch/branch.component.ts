import { NbToastrService } from '@nebular/theme';
import { RoleService } from './../../services/role.service';
import { BranchEmployeeService } from './../../services/branch-employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchModel } from './../../models/branch.model';
import { BranchService } from './../../services/branch.service';
import { MenuService } from './../menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit, OnDestroy {
  loading: boolean;
  branchId: string;

  constructor(
    private menuService: MenuService,
    private toastrService: NbToastrService,
    private branchService: BranchService,
    private branchEmployeeService: BranchEmployeeService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      return;
    }

    this.branchEmployeeService.getBranchEmployeeRole(this.branchId).subscribe(
      (res: any) => {
        this.roleService.setEmployeeRole(res.role);
        this.menuService.showMenu();
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    );
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.branchService.deleteBranchId();
    this.branchService.deleteBranchData();
    this.roleService.setEmployeeRole(null);
  }
}
