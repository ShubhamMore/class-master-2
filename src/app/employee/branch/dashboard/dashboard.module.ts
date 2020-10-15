import { ChartModule } from 'angular2-chartjs';

import {
  NbCardModule,
  NbActionsModule,
  NbButtonModule,
  NbTooltipModule,
  NbIconModule,
  NbProgressBarModule,
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
    ChartModule,
    DashboardRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbProgressBarModule,
  ],
})
export class DashboardModule {}
