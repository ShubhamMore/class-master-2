import { ViewScheduleComponent } from './view-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewScheduleRoutingModule } from './view-schedule-routing.module';

@NgModule({
  declarations: [ViewScheduleComponent],
  imports: [CommonModule, ViewScheduleRoutingModule],
})
export class ViewScheduleModule {}
