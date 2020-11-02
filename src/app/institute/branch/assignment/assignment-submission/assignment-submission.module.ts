import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentSubmissionRoutingModule } from './assignment-submission-routing.module';
import { AssignmentSubmissionComponent } from './assignment-submission.component';
import { SubmissionGradingComponent } from './submission-grading/submission-grading.component';


@NgModule({
  declarations: [AssignmentSubmissionComponent, SubmissionGradingComponent],
  imports: [
    CommonModule,
    AssignmentSubmissionRoutingModule
  ]
})
export class AssignmentSubmissionModule { }
