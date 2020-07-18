import { ManageCourseComponent } from './manage-course.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCourseRoutingModule } from './manage-course-routing.module';

import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';

@NgModule({
  declarations: [ManageCourseComponent],
  imports: [
    CommonModule,
    ManageCourseRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
  ],
})
export class ManageCourseModule {}
