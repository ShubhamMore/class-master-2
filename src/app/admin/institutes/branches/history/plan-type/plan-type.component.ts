import { MembershipPlanModel } from '../../../../../models/membership-plan.model';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { MembershipService } from './../../../../../services/membership.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-plan-type',
  templateUrl: './plan-type.component.html',
  styleUrls: ['./plan-type.component.scss'],
})
export class PlanTypeComponent implements OnInit {
  loading: boolean;

  memberships: MembershipPlanModel[];

  constructor(
    private membershipService: MembershipService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<PlanTypeComponent>,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.memberships = [
      new MembershipPlanModel(null, 'monthly', '1', '1999', true),
      new MembershipPlanModel(null, 'quarterly', '3', '4999', true),
      new MembershipPlanModel(null, 'half-yearly', '6', '7999', true),
      new MembershipPlanModel(null, 'yearly', '12', '11999', true),
    ];

    this.getMemberships();
  }

  getMemberships() {
    this.loading = true;
    this.membershipService.getMemberships().subscribe(
      (memberships: MembershipPlanModel[]) => {
        for (let i = 0; i < 4; i++) {
          const membership = this.memberships[i];

          const newMembership = memberships.find(
            (curMembership: MembershipPlanModel) => curMembership.name === membership.name,
          );

          if (newMembership) {
            this.memberships[i] = newMembership;
          }
        }

        this.loading = false;
      },
      (error: any) => {
        this.showToastr('top-right', 'danger', error);
        this.loading = false;
      },
    );
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString() + '/-';
  }

  selectPlanType(membershipPlan: MembershipPlanModel) {
    this.ref.close(membershipPlan);
  }

  onClose() {
    this.ref.close();
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
