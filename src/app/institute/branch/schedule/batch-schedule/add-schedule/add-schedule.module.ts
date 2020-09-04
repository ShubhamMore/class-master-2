import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbStepperModule,
  NbSelectModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { AddScheduleComponent } from './add-schedule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddScheduleRoutingModule } from './add-schedule-routing.module';

@NgModule({
  declarations: [AddScheduleComponent],
  imports: [
    CommonModule,
    AddScheduleRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbCheckboxModule,
    NbStepperModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AddScheduleModule {}
