import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbBadgeModule,
  NbTooltipModule,
  NbSelectModule,
} from '@nebular/theme';
import { ManageLeadComponent } from './manage-lead.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLeadRoutingModule } from './manage-lead-routing.module';

@NgModule({
  declarations: [ManageLeadComponent],
  imports: [
    CommonModule,
    ManageLeadRoutingModule,

    NbCardModule,
    NbSelectModule,
    NbBadgeModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageLeadModule {}
