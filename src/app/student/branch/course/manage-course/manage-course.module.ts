import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCourseRoutingModule } from './manage-course-routing.module';
import { ManageCourseComponent } from './manage-course.component';

@NgModule({
  declarations: [ManageCourseComponent],
  imports: [CommonModule, ManageCourseRoutingModule, NbCardModule, NbButtonModule, NbIconModule],
})
export class ManageCourseModule {}
