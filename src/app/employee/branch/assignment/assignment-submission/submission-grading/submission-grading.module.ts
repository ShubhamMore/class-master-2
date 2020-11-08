import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbInputModule,
} from '@nebular/theme';
import { SubmissionGradingComponent } from './submission-grading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmissionGradingRoutingModule } from './submission-grading-routing.module';

@NgModule({
  declarations: [SubmissionGradingComponent],
  imports: [
    CommonModule,
    SubmissionGradingRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class SubmissionGradingModule {}
