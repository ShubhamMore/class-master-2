import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseInstallmentReceiptRoutingModule } from './course-installment-receipt-routing.module';
import { CourseInstallmentReceiptComponent } from './course-installment-receipt.component';

@NgModule({
  declarations: [CourseInstallmentReceiptComponent],
  imports: [
    CommonModule,
    CourseInstallmentReceiptRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class CourseInstallmentReceiptModule {}
