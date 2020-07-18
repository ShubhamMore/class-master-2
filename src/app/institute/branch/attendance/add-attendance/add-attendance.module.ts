import { AddAttendanceComponent } from './add-attendance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAttendanceRoutingModule } from './add-attendance-routing.module';

@NgModule({
  declarations: [AddAttendanceComponent],
  imports: [CommonModule, AddAttendanceRoutingModule],
})
export class AddAttendanceModule {}
