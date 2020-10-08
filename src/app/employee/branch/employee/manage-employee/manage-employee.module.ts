import { ManageEmployeeComponent } from './manage-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEmployeeRoutingModule } from './manage-employee-routing.module';

import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';

@NgModule({
  declarations: [ManageEmployeeComponent],
  imports: [
    CommonModule,
    ManageEmployeeRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageEmployeeModule {}
