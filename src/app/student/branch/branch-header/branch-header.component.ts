import { ActivatedRoute, Router } from '@angular/router';
import { BranchModel } from '../../../models/branch.model';
import { Component, OnInit } from '@angular/core';
import { BranchService } from './../../../services/branch.service';

@Component({
  selector: 'ngx-branch-header',
  templateUrl: './branch-header.component.html',
  styleUrls: ['./branch-header.component.scss'],
})
export class BranchHeaderComponent implements OnInit {
  loading: boolean;
  branchId: string;
  branch: BranchModel;
  constructor(
    private branchService: BranchService,
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

    this.branchService.getBranch(this.branchId).subscribe(
      (branch: BranchModel) => {
        this.branch = branch;
        this.branchService.setBranchData(branch);
        this.loading = false;
      },
      (err: any) => {
        // this.router.navigate(['../page-not-found'], { relativeTo: this.route });
      },
    );
  }
}
