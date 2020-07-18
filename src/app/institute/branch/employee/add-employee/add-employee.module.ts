import { AddEmployeeComponent } from './add-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEmployeeRoutingModule } from './add-employee-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbStepperModule,
  NbFormFieldModule,
  NbCheckboxModule,
  NbTooltipModule,
} from '@nebular/theme';

@NgModule({
  declarations: [AddEmployeeComponent],
  imports: [
    CommonModule,
    AddEmployeeRoutingModule,

    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbIconModule,
    NbStepperModule,
    NbTooltipModule,
    NbFormFieldModule,

    ReactiveFormsModule,
  ],
})
export class AddEmployeeModule {}
