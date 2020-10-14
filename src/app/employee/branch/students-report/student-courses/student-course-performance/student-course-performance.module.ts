import { NbCardModule, NbSelectModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCoursePerformanceRoutingModule } from './student-course-performance-routing.module';
import { StudentCoursePerformanceComponent } from './student-course-performance.component';

@NgModule({
  declarations: [StudentCoursePerformanceComponent],
  imports: [
    CommonModule,
    StudentCoursePerformanceRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class StudentCoursePerformanceModule {}
