import { AuthService } from './../../authentication/auth/auth-service/auth.service';
import { BranchService } from './../../services/branch.service';
import { BranchModel } from './../../models/branch.model';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading: boolean;
  user: any;
  branches: BranchModel[];

  constructor(
    private branchService: BranchService,
    private authService: AuthService,
    private menuService: MenuService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.branches = [];
    this.menuService.hideMenu();
    this.branchService.setBranchId('');
    this.user = this.authService.getUserData();
    this.branchService.getBranches(this.user.imsMasterId).subscribe(
      (branches: BranchModel[]) => {
        this.branches = branches;
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
      },
    );
  }
}
