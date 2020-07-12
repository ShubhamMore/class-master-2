import { ManageEmployeeComponent } from './manage-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEmployeeRoutingModule } from './manage-employee-routing.module';
import { ActiveEmployeeComponent } from './active-employee/active-employee.component';
import { InactiveEmployeeComponent } from './inactive-employee/inactive-employee.component';

@NgModule({
  declarations: [ActiveEmployeeComponent, ManageEmployeeComponent, InactiveEmployeeComponent],
  imports: [CommonModule, ManageEmployeeRoutingModule],
})
export class ManageEmployeeModule {}
