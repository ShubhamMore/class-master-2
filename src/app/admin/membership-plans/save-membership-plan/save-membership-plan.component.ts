import { MembershipService } from './../../../services/membership.service';
import { MembershipPlanModel as MembershipModel } from '../../../models/membership-plan.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-save-membership-plan',
  templateUrl: './save-membership-plan.component.html',
  styleUrls: ['./save-membership-plan.component.scss'],
})
export class SaveMembershipPlanComponent implements OnInit, OnDestroy {
  loading: boolean;
  submit: boolean;

  membership: MembershipModel;
  membershipForm: FormGroup;

  constructor(
    private membershipService: MembershipService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<SaveMembershipPlanComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.submit = false;

    this.membershipService.getMembershipPlan().subscribe((membership: MembershipModel) => {
      this.membership = membership;

      if (!membership) {
        this.onClose();
        return;
      }

      this.membershipForm = new FormGroup({
        name: new FormControl(membership.name, {
          validators: [Validators.required],
        }),
        duration: new FormControl(membership.duration, {
          validators: [Validators.required],
        }),
        price: new FormControl(membership.price, {
          validators: [Validators.required, Validators.min(0)],
        }),
      });

      this.loading = false;
    });
  }

  saveMembership() {
    this.membershipForm.markAllAsTouched();

    if (this.membershipForm.invalid) {
      this.showToastr('top-right', 'danger', 'Membership Details are required');
      return;
    }

    this.submit = true;

    const membership: any = { ...this.membershipForm.value };

    if (this.membership._id) {
      membership._id = this.membership._id;
    }

    this.membershipService.saveMembershipPlan(membership).subscribe(
      (resMembership: MembershipModel) => {
        this.ref.close(resMembership);
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.submit = false;
      },
    );
  }

  onClose() {
    this.ref.close();
  }

  private showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  ngOnDestroy() {
    this.membershipService.setMembershipPlan(null);
  }
}
