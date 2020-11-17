import { FormsModule } from '@angular/forms';
import { ManageOnlineTestComponent } from './manage-online-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOnlineTestRoutingModule } from './manage-online-test-routing.module';
import {
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbTooltipModule,
  NbAccordionModule,
  NbFormFieldModule,
  NbSelectModule,
} from '@nebular/theme';
@NgModule({
  declarations: [ManageOnlineTestComponent],
  imports: [
    CommonModule,
    ManageOnlineTestRoutingModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbTooltipModule,
    NbAccordionModule,
    NbFormFieldModule,
    FormsModule,
  ],
})
export class ManageOnlineTestModule {}
