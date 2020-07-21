import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectStudentCourseInstallmentRoutingModule } from './collect-student-course-installment-routing.module';
import { CollectStudentCourseInstallmentComponent } from './collect-student-course-installment.component';

@NgModule({
  declarations: [CollectStudentCourseInstallmentComponent],
  imports: [CommonModule, CollectStudentCourseInstallmentRoutingModule],
})
export class CollectStudentCourseInstallmentModule {}
