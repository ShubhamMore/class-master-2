import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbFormFieldModule,
  NbCheckboxModule,
  NbStepperModule,
} from '@nebular/theme';
import { CourseComponent } from './course.component';
import { AddCourseComponent } from './manage-course/add-course/add-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { ManageCourseComponent } from './manage-course/manage-course.component';

@NgModule({
  declarations: [CourseComponent, ManageCourseComponent, AddCourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbCheckboxModule,
    NbStepperModule,
    NbFormFieldModule,

    ReactiveFormsModule,
  ],
})
export class CourseModule {}
