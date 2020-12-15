import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';

@NgModule({
  declarations: [TransactionComponent],
  imports: [CommonModule, NbCardModule, NbButtonModule, TransactionRoutingModule],
})
export class TransactionModule {}
