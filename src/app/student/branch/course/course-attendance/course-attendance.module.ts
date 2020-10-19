import { NbCardModule, NbSelectModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseAttendanceRoutingModule } from './course-attendance-routing.module';
import { CourseAttendanceComponent } from './course-attendance.component';

@NgModule({
  declarations: [CourseAttendanceComponent],
  imports: [
    CommonModule,
    CourseAttendanceRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class CourseAttendanceModule {}
