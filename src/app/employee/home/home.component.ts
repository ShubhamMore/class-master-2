import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../authentication/auth/auth-service/auth.service';
import { BranchService } from './../../services/branch.service';
import { BranchModel } from '../../models/branch.model';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';
import { RoleService } from './../../services/role.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading: boolean;

  branches: BranchModel[];

  constructor(
    private branchService: BranchService,
    private roleService: RoleService,
    private authService: AuthService,
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branches = [];
    this.menuService.hideMenus();
    this.branchService.setBranchId('');

    this.branchService.getBranchesForEmployee().subscribe(
      (branches: BranchModel[]) => {
        this.branches = branches;
        this.branchService.setBranchesData(branches);
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      },
    );
  }

  manageBranch(id: string, role: string) {
    this.roleService.setEmployeeRole(role);
    this.branchService.setBranchId(id);
    this.router.navigate(['../branch/dashboard'], { relativeTo: this.route });
  }
}
