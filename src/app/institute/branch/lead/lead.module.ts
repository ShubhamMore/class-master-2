import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadComponent } from './lead.component';
import { AddLeadComponent } from './add-lead/add-lead.component';

@NgModule({
  declarations: [LeadComponent],
  imports: [CommonModule, LeadRoutingModule],
})
export class LeadModule {}
