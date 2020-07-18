import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';

@NgModule({
  declarations: [CourseComponent],
  imports: [CommonModule, CourseRoutingModule],
})
export class CourseModule {}
