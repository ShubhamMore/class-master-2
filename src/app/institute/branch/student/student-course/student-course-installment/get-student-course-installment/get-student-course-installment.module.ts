import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetStudentCourseInstallmentRoutingModule } from './get-student-course-installment-routing.module';
import { GetStudentCourseInstallmentComponent } from './get-student-course-installment.component';


@NgModule({
  declarations: [GetStudentCourseInstallmentComponent],
  imports: [
    CommonModule,
    GetStudentCourseInstallmentRoutingModule
  ]
})
export class GetStudentCourseInstallmentModule { }
