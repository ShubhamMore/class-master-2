import { ManageStudentComponent } from './manage-student/manage-student.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbSelectModule,
  NbInputModule,
  NbCheckboxModule,
  NbButtonModule,
  NbIconModule,
  NbStepperModule,
  NbTooltipModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { AddStudentComponent } from './add-student/add-student.component';

@NgModule({
  declarations: [StudentComponent, AddStudentComponent, ManageStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbIconModule,
    NbStepperModule,
    NbTooltipModule,
    NbFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class StudentModule {}
