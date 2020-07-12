import { ManageLeadComponent } from './manage-lead.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLeadRoutingModule } from './manage-lead-routing.module';
import { ActiveLeadComponent } from './active-lead/active-lead.component';
import { InactiveLeadComponent } from './inactive-lead/inactive-lead.component';

@NgModule({
  declarations: [ManageLeadComponent, ActiveLeadComponent, InactiveLeadComponent],
  imports: [CommonModule, ManageLeadRoutingModule],
})
export class ManageLeadModule {}
