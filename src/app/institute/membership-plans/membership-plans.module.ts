import { MembershipPlansComponent } from './membership-plans.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipPlansRoutingModule } from './membership-plans-routing.module';
import { ThemeModule } from './../../@theme/theme.module';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@nebular/theme';

@NgModule({
  declarations: [MembershipPlansComponent],
  imports: [
    CommonModule,
    MembershipPlansRoutingModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbSpinnerModule,
    NbTooltipModule,
  ],
})
export class MembershipPlansModule {}
