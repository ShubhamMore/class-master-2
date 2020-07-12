import { CourseComponent } from './course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ManageCourseComponent } from './manage-course/manage-course.component';

@NgModule({
  declarations: [CourseComponent, ManageCourseComponent, AddCourseComponent],
  imports: [CommonModule, CourseRoutingModule],
})
export class CourseModule {}
