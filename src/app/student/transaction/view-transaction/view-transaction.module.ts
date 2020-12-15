import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTransactionRoutingModule } from './view-transaction-routing.module';
import { ViewTransactionComponent } from './view-transaction.component';

@NgModule({
  declarations: [ViewTransactionComponent],
  imports: [CommonModule, ViewTransactionRoutingModule, NbCardModule, NbButtonModule],
})
export class ViewTransactionModule {}
