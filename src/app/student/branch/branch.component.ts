import { BranchModel } from '../../models/branch.model';
import { InstituteKeysService } from './../../services/institute-keys.service';
import { NbToastrService } from '@nebular/theme';
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
    private toastrService: NbToastrService,
    private branchService: BranchService,
    private instituteKeysService: InstituteKeysService,
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

    this.branchService.getBranchForStudent(this.branchId).subscribe(
      (branch: BranchModel) => {
        this.branchService.setBranchData(branch);
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.router.navigate(['../'], { relativeTo: this.route });
      },
    );

    this.instituteKeysService.getInstitutePaymentAccessKey(this.branchId).subscribe(
      (paymentGateway: any) => {
        if (paymentGateway && paymentGateway.accessKey) {
          this.instituteKeysService.setLocalInstitutePaymentAccessKey(paymentGateway.accessKey);
        }
      },
      (error: any) => {},
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
    this.instituteKeysService.setLocalInstitutePaymentAccessKey(null);
  }
}
