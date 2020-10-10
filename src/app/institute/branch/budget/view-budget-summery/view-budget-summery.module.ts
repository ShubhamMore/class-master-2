import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBudgetSummeryRoutingModule } from './view-budget-summery-routing.module';
import { ViewBudgetSummeryComponent } from './view-budget-summery.component';

@NgModule({
  declarations: [ViewBudgetSummeryComponent],
  imports: [
    CommonModule,
    ViewBudgetSummeryRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class ViewBudgetSummeryModule {}
