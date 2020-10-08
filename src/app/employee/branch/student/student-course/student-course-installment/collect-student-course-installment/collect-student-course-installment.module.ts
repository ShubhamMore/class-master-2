import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbStepperModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectStudentCourseInstallmentRoutingModule } from './collect-student-course-installment-routing.module';
import { CollectStudentCourseInstallmentComponent } from './collect-student-course-installment.component';

@NgModule({
  declarations: [CollectStudentCourseInstallmentComponent],
  imports: [
    CommonModule,
    CollectStudentCourseInstallmentRoutingModule,

    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbStepperModule,

    ReactiveFormsModule,
  ],
})
export class CollectStudentCourseInstallmentModule {}
