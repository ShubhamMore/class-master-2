import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentSubmissionRoutingModule } from './assignment-submission-routing.module';
import { AssignmentSubmissionComponent } from './assignment-submission.component';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbTooltipModule,
  NbFormFieldModule,
  NbSpinnerModule,
  NbStepperModule,
} from '@nebular/theme';

@NgModule({
  declarations: [AssignmentSubmissionComponent],
  imports: [
    CommonModule,
    AssignmentSubmissionRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbTooltipModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbStepperModule,
    ReactiveFormsModule,
  ],
})
export class AssignmentSubmissionModule {}
