import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentSubmissionRoutingModule } from './assignment-submission-routing.module';
import { AssignmentSubmissionComponent } from './assignment-submission.component';

@NgModule({
  declarations: [AssignmentSubmissionComponent],
  imports: [
    CommonModule,
    AssignmentSubmissionRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class AssignmentSubmissionModule {}
