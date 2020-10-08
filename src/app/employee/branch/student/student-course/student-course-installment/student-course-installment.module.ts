import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCourseInstallmentRoutingModule } from './student-course-installment-routing.module';
import { StudentCourseInstallmentComponent } from './student-course-installment.component';

@NgModule({
  declarations: [StudentCourseInstallmentComponent],
  imports: [CommonModule, StudentCourseInstallmentRoutingModule],
})
export class StudentCourseInstallmentModule {}
