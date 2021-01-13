import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbSpinnerModule,
  NbStepperModule,
  NbSelectModule,
  NbCheckboxModule,
  NbTooltipModule,
} from '@nebular/theme';
import { AddScheduleComponent } from './add-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddScheduleRoutingModule } from './add-schedule-routing.module';
import { RepeatScheduleComponent } from './repeat-schedule/repeat-schedule.component';

@NgModule({
  declarations: [AddScheduleComponent, RepeatScheduleComponent],
  imports: [
    CommonModule,
    AddScheduleRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTooltipModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AddScheduleModule {}
