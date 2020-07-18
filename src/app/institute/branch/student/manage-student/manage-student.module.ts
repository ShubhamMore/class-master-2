import { ManageStudentComponent } from './manage-student.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentRoutingModule } from './manage-student-routing.module';

import {
  NbCardModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';

@NgModule({
  declarations: [ManageStudentComponent],
  imports: [
    CommonModule,
    ManageStudentRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageStudentModule {}
