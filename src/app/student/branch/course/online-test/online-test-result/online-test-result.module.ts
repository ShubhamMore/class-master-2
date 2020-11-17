import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineTestResultRoutingModule } from './online-test-result-routing.module';
import { OnlineTestResultComponent } from './online-test-result.component';

@NgModule({
  declarations: [OnlineTestResultComponent],
  imports: [
    CommonModule,
    OnlineTestResultRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class OnlineTestResultModule {}
