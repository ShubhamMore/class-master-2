import { AddScheduleComponent } from './add-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddScheduleRoutingModule } from './add-schedule-routing.module';

@NgModule({
  declarations: [AddScheduleComponent],
  imports: [CommonModule, AddScheduleRoutingModule],
})
export class AddScheduleModule {}
