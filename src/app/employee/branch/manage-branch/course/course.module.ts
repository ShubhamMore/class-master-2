import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseMaterialComponent } from './course-material/course-material.component';
import { ManageCourseMaterialComponent } from './course-material/manage-course-material/manage-course-material.component';
import { AddCourseMaterialComponent } from './course-material/add-course-material/add-course-material.component';
import { ViewCourseMaterialComponent } from './course-material/view-course-material/view-course-material.component';

@NgModule({
  declarations: [CourseComponent],
  imports: [CommonModule, CourseRoutingModule],
})
export class CourseModule {}
