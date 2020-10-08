import { ManageBatchScheduleComponent } from './manage-batch-schedule.component';
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbAccordionModule,
  NbFormFieldModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBatchScheduleRoutingModule } from './manage-batch-schedule-routing.module';

@NgModule({
  declarations: [ManageBatchScheduleComponent],
  imports: [
    CommonModule,
    ManageBatchScheduleRoutingModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbFormFieldModule,
  ],
})
export class ManageBatchScheduleModule {}
