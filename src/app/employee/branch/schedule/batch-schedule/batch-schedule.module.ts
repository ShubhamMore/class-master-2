import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchScheduleRoutingModule } from './batch-schedule-routing.module';
import { BatchScheduleComponent } from './batch-schedule.component';

@NgModule({
  declarations: [BatchScheduleComponent],
  imports: [CommonModule, BatchScheduleRoutingModule],
})
export class BatchScheduleModule {}
