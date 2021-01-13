import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCourseInstallmentRoutingModule } from './manage-course-installment-routing.module';
import { ManageCourseInstallmentComponent } from './manage-course-installment.component';

@NgModule({
  declarations: [ManageCourseInstallmentComponent],
  imports: [
    CommonModule,
    ManageCourseInstallmentRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageCourseInstallmentModule {}
