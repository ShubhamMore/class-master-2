import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [AddEmployeeComponent, EmployeeComponent],
  imports: [CommonModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
