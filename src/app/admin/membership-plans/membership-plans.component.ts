import { SaveMembershipPlanComponent } from './save-membership-plan/save-membership-plan.component';
import { MembershipPlanModel } from '../../models/membership-plan.model';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { MembershipService } from './../../services/membership.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-membership-plans',
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.scss'],
})
export class MembershipPlansComponent implements OnInit {
  loading: boolean;

  memberships: MembershipPlanModel[];

  constructor(
    private membershipService: MembershipService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
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

  openMembershipDialog() {
    this.dialogService
      .open(SaveMembershipPlanComponent, {
        context: {},
      })
      .onClose.subscribe((membership: any) => membership && this.getMemberships());
  }

  getAmount(amount: any) {
    amount = parseFloat(amount.toString());
    return amount.toFixed(2).toString() + '/-';
  }

  editMembership(membershipPlan: MembershipPlanModel) {
    this.membershipService.setMembershipPlan(membershipPlan);
    this.openMembershipDialog();
  }

  showToastr(position: any, status: any, message: string) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
