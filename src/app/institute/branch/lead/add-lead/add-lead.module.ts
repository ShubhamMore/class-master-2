import { AddLeadComponent } from './add-lead.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLeadRoutingModule } from './add-lead-routing.module';

@NgModule({
  declarations: [AddLeadComponent],
  imports: [CommonModule, AddLeadRoutingModule],
})
export class AddLeadModule {}
