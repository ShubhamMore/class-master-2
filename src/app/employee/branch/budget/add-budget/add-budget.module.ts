import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbStepperModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBudgetRoutingModule } from './add-budget-routing.module';
import { AddBudgetComponent } from './add-budget.component';

@NgModule({
  declarations: [AddBudgetComponent],
  imports: [
    CommonModule,
    AddBudgetRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbIconModule,
    NbStepperModule,
  ],
})
export class AddBudgetModule {}
