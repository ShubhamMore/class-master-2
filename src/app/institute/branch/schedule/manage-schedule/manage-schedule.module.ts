import { ManageScheduleComponent } from './manage-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageScheduleRoutingModule } from './manage-schedule-routing.module';

@NgModule({
  declarations: [ManageScheduleComponent],
  imports: [CommonModule, ManageScheduleRoutingModule],
})
export class ManageScheduleModule {}
