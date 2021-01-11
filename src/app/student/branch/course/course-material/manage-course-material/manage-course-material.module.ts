import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbSelectModule,
} from '@nebular/theme';
import { ManageCourseMaterialComponent } from './manage-course-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCourseMaterialRoutingModule } from './manage-course-material-routing.module';

@NgModule({
  declarations: [ManageCourseMaterialComponent],
  imports: [
    CommonModule,
    ManageCourseMaterialRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbSelectModule,
  ],
})
export class ManageCourseMaterialModule {}
