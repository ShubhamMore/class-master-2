import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEmployeeSalaryRoutingModule } from './manage-employee-salary-routing.module';
import { ManageEmployeeSalaryComponent } from './manage-employee-salary.component';

@NgModule({
  declarations: [ManageEmployeeSalaryComponent],
  imports: [CommonModule, ManageEmployeeSalaryRoutingModule],
})
export class ManageEmployeeSalaryModule {}
