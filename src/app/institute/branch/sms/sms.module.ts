import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsRoutingModule } from './sms-routing.module';
import { SmsComponent } from './sms.component';

@NgModule({
  declarations: [SmsComponent],
  imports: [
    CommonModule,
    SmsRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class SmsModule {}
