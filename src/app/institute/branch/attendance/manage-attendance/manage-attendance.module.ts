import { ManageAttendanceComponent } from './manage-attendance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAttendanceRoutingModule } from './manage-attendance-routing.module';

@NgModule({
  declarations: [ManageAttendanceComponent],
  imports: [CommonModule, ManageAttendanceRoutingModule],
})
export class ManageAttendanceModule {}
