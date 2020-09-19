import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbIconModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbStepperModule,
  NbToggleModule,
  NbTooltipModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSalaryRoutingModule } from './add-salary-routing.module';
import { AddSalaryComponent } from './add-salary.component';

@NgModule({
  declarations: [AddSalaryComponent],
  imports: [
    CommonModule,
    AddSalaryRoutingModule,
    NbCardModule,
    NbIconModule,
    NbSelectModule,
    NbInputModule,
    NbTooltipModule,
    NbButtonModule,
    NbStepperModule,
    NbToggleModule,
    NbFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class AddSalaryModule {}
