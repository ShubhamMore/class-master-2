import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeLeaveRoutingModule } from './employee-leave-routing.module';
import { EmployeeLeaveComponent } from './employee-leave.component';
import { ShowEmployeeLeaveComponent } from './show-employee-leave/show-employee-leave.component';


@NgModule({
  declarations: [EmployeeLeaveComponent, ShowEmployeeLeaveComponent],
  imports: [
    CommonModule,
    EmployeeLeaveRoutingModule
  ]
})
export class EmployeeLeaveModule { }
