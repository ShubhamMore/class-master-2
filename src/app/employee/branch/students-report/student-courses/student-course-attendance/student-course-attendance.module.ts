import { NbCardModule, NbSelectModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCourseAttendanceRoutingModule } from './student-course-attendance-routing.module';
import { StudentCourseAttendanceComponent } from './student-course-attendance.component';

@NgModule({
  declarations: [StudentCourseAttendanceComponent],
  imports: [
    CommonModule,
    StudentCourseAttendanceRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class StudentCourseAttendanceModule {}
