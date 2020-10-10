import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';

@NgModule({
  declarations: [AttendanceComponent],
  imports: [CommonModule, AttendanceRoutingModule, NbCardModule, NbButtonModule, NbIconModule],
})
export class AttendanceModule {}
