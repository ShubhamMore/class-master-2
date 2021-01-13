import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudentRoutingModule } from './add-student-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbSelectModule,
  NbCheckboxModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTooltipModule,
  NbFormFieldModule,
} from '@nebular/theme';

import { AddStudentComponent } from './add-student.component';

@NgModule({
  declarations: [AddStudentComponent],
  imports: [
    CommonModule,
    AddStudentRoutingModule,

    NbCardModule,
    NbSelectModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTooltipModule,

    ReactiveFormsModule,
  ],
})
export class AddStudentModule {}
