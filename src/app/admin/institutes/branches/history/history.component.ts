import { DateService } from './../../../../services/shared-services/date.service';
import { MembershipPlanModel } from '../../../../models/membership-plan.model';
import { PlanTypeComponent } from './plan-type/plan-type.component';
import { BranchHistoryModel } from '../../../../models/branch-history.model';
import { BranchModel, BranchAddressModel, CategoryModel } from '../../../../models/branch.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { InstituteModel } from '../../../../models/institute.model';
import { Component, OnInit } from '@angular/core';
import { InstituteService } from '../../../services/institute.service';

@Component({
  selector: 'ngx-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  loading: boolean;
  institute: InstituteModel;
  branch: BranchModel;

  history: BranchHistoryModel[];

  constructor(
    private instituteService: InstituteService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.instituteService.getInstitute().subscribe((institute: InstituteModel) => {
      if (!institute) {
        this.showToastr('top right', 'danger', 'Invalid Institute');
        return;
      }

      this.institute = institute;

      this.instituteService.getBranch().subscribe((branch: BranchModel) => {
        if (!branch) {
          this.showToastr('top right', 'danger', 'Invalid Institute');
          return;
        }

        this.branch = branch;

        this.instituteService.getInstituteBranchHistory(branch._id).subscribe(
          (history: BranchHistoryModel[]) => {
            this.history = history;
            this.loading = false;
          },
          (error: any) => {
            this.showToastr('top right', 'danger', error);
            this.loading = false;
          },
        );
      });
    });
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

  changeBranchStatus(status: boolean) {
    if (status) {
      this.openPlanTypeDialog();
    } else {
      this.deactivateBranch();
    }
  }

  openPlanTypeDialog() {
    this.dialogService
      .open(PlanTypeComponent, {
        context: {},
      })
      .onClose.subscribe(
        (membershipPlan: MembershipPlanModel) =>
          membershipPlan && this.activateBranch(membershipPlan),
      );
  }

  private activateBranch(membershipPlan: MembershipPlanModel) {
    if (!membershipPlan) {
      this.showToastr('top right', 'danger', 'Invalid Membership Plan');
      return;
    }

    this.loading = true;

    this.instituteService
      .activateInstituteBranch(this.branch._id, membershipPlan.name, membershipPlan.price)
      .subscribe(
        (res: any) => {
          this.branch.status = true;
          this.loading = false;
        },
        (error: any) => {
          this.showToastr('top right', 'danger', error);
          this.loading = false;
        },
      );
  }

  private deactivateBranch() {
    this.loading = true;

    this.instituteService.deactivateInstituteBranch(this.branch._id).subscribe(
      (res: any) => {
        this.branch.status = false;
        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top right', 'danger', error);
        this.loading = false;
      },
    );
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
