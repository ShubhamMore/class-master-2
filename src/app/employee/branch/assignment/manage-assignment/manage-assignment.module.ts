import {
  NbCardModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAssignmentRoutingModule } from './manage-assignment-routing.module';
import { ManageAssignmentComponent } from './manage-assignment.component';

@NgModule({
  declarations: [ManageAssignmentComponent],
  imports: [
    CommonModule,
    ManageAssignmentRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageAssignmentModule {}
