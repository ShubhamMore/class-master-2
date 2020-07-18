import { ManageBudgetComponent } from './manage-budget.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBudgetRoutingModule } from './manage-budget-routing.module';

@NgModule({
  declarations: [ManageBudgetComponent],
  imports: [CommonModule, ManageBudgetRoutingModule],
})
export class ManageBudgetModule {}
