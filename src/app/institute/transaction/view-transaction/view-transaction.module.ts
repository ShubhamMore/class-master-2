import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTransactionRoutingModule } from './view-transaction-routing.module';
import { ViewTransactionComponent } from './view-transaction.component';

@NgModule({
  declarations: [ViewTransactionComponent],
  imports: [
    CommonModule,
    ViewTransactionRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ViewTransactionModule {}
