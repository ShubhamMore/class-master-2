import { AuthService } from './../../authentication/auth/auth-service/auth.service';
import { BranchModel, BranchAddressModel } from './../../models/branch.model';
import { BranchService } from './../../services/branch.service';
import { MenuService } from './../menu.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-my-institutes',
  templateUrl: './my-institutes.component.html',
  styleUrls: ['./my-institutes.component.scss'],
})
export class MyInstitutesComponent implements OnInit {
  loading: boolean;
  branches: BranchModel[];

  user: any;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
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

  getAddress(address: BranchAddressModel) {
    const address2 = address.address2 ? address.address2 + ', ' : '';

    return (
      address.address1 +
      ', ' +
      address2 +
      address.city +
      ' - ' +
      address.pinCode +
      ', ' +
      address.state
    );
  }

  manageBranch(id: string) {
    this.branchService.setBranchId(id);
    this.router.navigate(['/institute/branch/dashboard'], { relativeTo: this.route });
  }

  viewBranch(id: string) {
    this.branchService.setBranchId(id);
    this.router.navigate(['/institute/view'], { relativeTo: this.route });
  }

  editBranch(id: string) {
    this.branchService.setBranchId(id);
    this.router.navigate(['/institute/edit'], {
      // relativeTo: this.route,
      queryParams: { mode: 'edit' },
    });
  }
}
