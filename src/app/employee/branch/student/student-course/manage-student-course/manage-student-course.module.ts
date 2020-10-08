import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentCourseRoutingModule } from './manage-student-course-routing.module';
import { ManageStudentCourseComponent } from './manage-student-course.component';

@NgModule({
  declarations: [ManageStudentCourseComponent],
  imports: [
    CommonModule,
    ManageStudentCourseRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class ManageStudentCourseModule {}
