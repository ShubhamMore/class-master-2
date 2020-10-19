import { NbCardModule, NbSelectModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursePerformanceRoutingModule } from './course-performance-routing.module';
import { CoursePerformanceComponent } from './course-performance.component';

@NgModule({
  declarations: [CoursePerformanceComponent],
  imports: [
    CommonModule,
    CoursePerformanceRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class CoursePerformanceModule {}
