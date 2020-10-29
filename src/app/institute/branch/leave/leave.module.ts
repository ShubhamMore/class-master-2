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
import { LeaveCommentComponent } from './leave-comment/leave-comment.component';

@NgModule({
  declarations: [LeaveComponent, LeaveCommentComponent],
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
