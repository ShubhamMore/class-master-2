import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCoursePerformanceRoutingModule } from './student-course-performance-routing.module';
import { StudentCoursePerformanceComponent } from './student-course-performance.component';

@NgModule({
  declarations: [StudentCoursePerformanceComponent],
  imports: [CommonModule, StudentCoursePerformanceRoutingModule],
})
export class StudentCoursePerformanceModule {}
