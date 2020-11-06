import {
  NbCardModule,
  NbTooltipModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbAccordionModule,
  NbFormFieldModule,
  NbSelectModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchAssignmentRoutingModule } from './batch-assignment-routing.module';
import { BatchAssignmentComponent } from './batch-assignment.component';

@NgModule({
  declarations: [BatchAssignmentComponent],
  imports: [
    CommonModule,
    BatchAssignmentRoutingModule,

    NbCardModule,
    NbTooltipModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbFormFieldModule,
    NbSelectModule,
  ],
})
export class BatchAssignmentModule {}
