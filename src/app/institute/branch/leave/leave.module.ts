import {
  NbCardModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbTooltipModule,
  NbIconModule,
  NbTabsetModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveComponent } from './leave.component';
import { ShowLeaveComponent } from './show-leave/show-leave.component';

@NgModule({
  declarations: [LeaveComponent, ShowLeaveComponent],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
    NbIconModule,
    NbTabsetModule,
  ],
})
export class LeaveModule {}
