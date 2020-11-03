import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbTooltipModule,
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
    NbFormFieldModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbTooltipModule,
    NbStepperModule,
    ReactiveFormsModule,
  ],
})
export class SaveAssignmentModule {}
