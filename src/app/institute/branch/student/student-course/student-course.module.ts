import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCourseRoutingModule } from './student-course-routing.module';
import { StudentCourseComponent } from './student-course.component';

@NgModule({
  declarations: [StudentCourseComponent],
  imports: [CommonModule, StudentCourseRoutingModule],
})
export class StudentCourseModule {}
