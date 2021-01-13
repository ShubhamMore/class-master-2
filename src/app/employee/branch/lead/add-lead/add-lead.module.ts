import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbSpinnerModule,
  NbStepperModule,
  NbInputModule,
} from '@nebular/theme';
import { AddLeadComponent } from './add-lead.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLeadRoutingModule } from './add-lead-routing.module';

@NgModule({
  declarations: [AddLeadComponent],
  imports: [
    CommonModule,
    AddLeadRoutingModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbIconModule,
    NbSpinnerModule,
    NbStepperModule,
    NbInputModule,
  ],
})
export class AddLeadModule {}
