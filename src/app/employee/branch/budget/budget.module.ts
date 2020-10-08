import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget.component';
import { ManageBudgetComponent } from './manage-budget/manage-budget.component';

@NgModule({
  declarations: [BudgetComponent],
  imports: [CommonModule, BudgetRoutingModule],
})
export class BudgetModule {}
