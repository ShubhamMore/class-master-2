import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCourseInstallmentReceiptRoutingModule } from './student-course-installment-receipt-routing.module';
import { StudentCourseInstallmentReceiptComponent } from './student-course-installment-receipt.component';


@NgModule({
  declarations: [StudentCourseInstallmentReceiptComponent],
  imports: [
    CommonModule,
    StudentCourseInstallmentReceiptRoutingModule
  ]
})
export class StudentCourseInstallmentReceiptModule { }
