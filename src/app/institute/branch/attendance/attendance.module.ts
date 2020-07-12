import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { ManageAttendanceComponent } from './manage-attendance/manage-attendance.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';


@NgModule({
  declarations: [AttendanceComponent, ManageAttendanceComponent, AddAttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
