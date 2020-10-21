import {
  NbIconModule,
  NbSelectModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipPlansRoutingModule } from './membership-plans-routing.module';
import { MembershipPlansComponent } from './membership-plans.component';
import { SaveMembershipPlanComponent } from './save-membership-plan/save-membership-plan.component';

@NgModule({
  declarations: [MembershipPlansComponent, SaveMembershipPlanComponent],
  imports: [
    CommonModule,
    MembershipPlansRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
})
export class MembershipPlansModule {}
