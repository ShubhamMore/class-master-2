import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCoursesRoutingModule } from './student-courses-routing.module';
import { StudentCoursesComponent } from './student-courses.component';

@NgModule({
  declarations: [StudentCoursesComponent],
  imports: [CommonModule, StudentCoursesRoutingModule],
})
export class StudentCoursesModule {}
