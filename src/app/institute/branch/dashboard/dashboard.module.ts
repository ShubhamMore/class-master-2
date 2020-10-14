import {
  NbCardModule,
  NbActionsModule,
  NbButtonModule,
  NbTooltipModule,
  NbIconModule,
  NbFormFieldModule,
  NbInputModule,
} from '@nebular/theme';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NbActionsModule,
    DashboardRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbFormFieldModule,
    NbInputModule,
  ],
})
export class DashboardModule {}
