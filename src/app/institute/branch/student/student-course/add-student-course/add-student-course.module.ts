import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudentCourseRoutingModule } from './add-student-course-routing.module';
import { AddStudentCourseComponent } from './add-student-course.component';

@NgModule({
  declarations: [AddStudentCourseComponent],
  imports: [CommonModule, AddStudentCourseRoutingModule],
})
export class AddStudentCourseModule {}
