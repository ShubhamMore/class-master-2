import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbSelectModule,
  NbButtonModule,
  NbTooltipModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyLeaveRoutingModule } from './my-leave-routing.module';
import { MyLeaveComponent } from './my-leave.component';
import { SaveLeaveComponent } from './save-leave/save-leave.component';

@NgModule({
  declarations: [MyLeaveComponent, SaveLeaveComponent],
  imports: [
    CommonModule,
    MyLeaveRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NbStepperModule,
    NbTabsetModule,
    NbSelectModule,
    NbButtonModule,
    NbTooltipModule,
    NbIconModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class MyLeaveModule {}
