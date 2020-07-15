import { BranchModel } from './../../models/branch.model';
import { Router, ActivatedRoute } from '@angular/router';
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
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.menuService.showMenu();

    this.branchId = this.branchService.getBranchId();
    if (!this.branchId) {
      this.router.navigate(['/institute/page-not-found'], { relativeTo: this.route });
      return;
    }
  }

  ngOnDestroy() {
    this.branchService.deleteBranchData();
  }
}
