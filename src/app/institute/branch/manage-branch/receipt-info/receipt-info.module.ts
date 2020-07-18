import { ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { ReceiptInfoComponent } from './receipt-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptInfoRoutingModule } from './receipt-info-routing.module';

@NgModule({
  declarations: [ReceiptInfoComponent],
  imports: [
    CommonModule,
    ReceiptInfoRoutingModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    ReactiveFormsModule,
  ],
})
export class ReceiptInfoModule {}
