import { NbToastrService } from '@nebular/theme';
import { BranchModel } from './../../models/branch.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from './../../services/branch.service';
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
    private branchService: BranchService,
    private toastrService: NbToastrService,
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

    this.branchService.checkBranchStatus(this.branchId).subscribe(
      (branchStatus: { activated: boolean }) => {
        if (branchStatus.activated) {
          this.loading = false;
        } else {
          this.showToastr('top-right', 'danger', 'Please Activate Branch');
          this.router.navigate(['../page-not-found'], { relativeTo: this.route });
        }
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.router.navigate(['../page-not-found'], { relativeTo: this.route });
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
  }
}
