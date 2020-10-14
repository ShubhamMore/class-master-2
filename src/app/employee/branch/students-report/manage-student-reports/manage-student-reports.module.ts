import {
  NbCardModule,
  NbFormFieldModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentReportsRoutingModule } from './manage-student-reports-routing.module';
import { ManageStudentReportsComponent } from './manage-student-reports.component';

@NgModule({
  declarations: [ManageStudentReportsComponent],
  imports: [
    CommonModule,
    ManageStudentReportsRoutingModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbFormFieldModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageStudentReportsModule {}
