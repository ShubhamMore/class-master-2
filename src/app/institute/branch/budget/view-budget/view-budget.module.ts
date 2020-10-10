import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBudgetRoutingModule } from './view-budget-routing.module';
import { ViewBudgetComponent } from './view-budget.component';


@NgModule({
  declarations: [ViewBudgetComponent],
  imports: [
    CommonModule,
    ViewBudgetRoutingModule
  ]
})
export class ViewBudgetModule { }
