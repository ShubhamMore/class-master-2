import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseInstallmentRoutingModule } from './course-installment-routing.module';
import { CourseInstallmentComponent } from './course-installment.component';

@NgModule({
  declarations: [CourseInstallmentComponent],
  imports: [CommonModule, CourseInstallmentRoutingModule],
})
export class CourseInstallmentModule {}
