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
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [AddEmployeeComponent, ManageEmployeeComponent, EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
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
export class EmployeeModule {}
