// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbTooltipModule,
  NbIconModule,
  NbTabsetModule,
} from '@nebular/theme';
import { ManageBudgetComponent } from './manage-budget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBudgetRoutingModule } from './manage-budget-routing.module';

@NgModule({
  declarations: [ManageBudgetComponent],
  imports: [
    CommonModule,
    ManageBudgetRoutingModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    // NgxChartsModule,
    ChartModule,
    NbTooltipModule,
    NbIconModule,
    NbTabsetModule,
  ],
})
export class ManageBudgetModule {}
