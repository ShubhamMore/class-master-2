import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';


@NgModule({
  declarations: [ScheduleComponent, AddScheduleComponent, ManageScheduleComponent, ViewScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
