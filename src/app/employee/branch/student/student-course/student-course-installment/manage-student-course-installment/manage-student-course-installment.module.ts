import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudentCourseInstallmentRoutingModule } from './manage-student-course-installment-routing.module';
import { ManageStudentCourseInstallmentComponent } from './manage-student-course-installment.component';

@NgModule({
  declarations: [ManageStudentCourseInstallmentComponent],
  imports: [
    CommonModule,
    ManageStudentCourseInstallmentRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageStudentCourseInstallmentModule {}
