import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbStepperModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaveAssignmentRoutingModule } from './save-assignment-routing.module';
import { SaveAssignmentComponent } from './save-assignment.component';

@NgModule({
  declarations: [SaveAssignmentComponent],
  imports: [
    CommonModule,
    SaveAssignmentRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbCheckboxModule,
    NbStepperModule,
    NbFormFieldModule,

    ReactiveFormsModule,
  ],
})
export class SaveAssignmentModule {}
