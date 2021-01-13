import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbSpinnerModule,
  NbStepperModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbSelectModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudentCourseRoutingModule } from './add-student-course-routing.module';
import { AddStudentCourseComponent } from './add-student-course.component';

@NgModule({
  declarations: [AddStudentCourseComponent],
  imports: [
    CommonModule,
    AddStudentCourseRoutingModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbSpinnerModule,
    NbStepperModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbSelectModule,

    ReactiveFormsModule,
  ],
})
export class AddStudentCourseModule {}
