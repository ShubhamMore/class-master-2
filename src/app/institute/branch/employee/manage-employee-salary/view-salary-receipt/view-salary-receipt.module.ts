import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSalaryReceiptRoutingModule } from './view-salary-receipt-routing.module';
import { ViewSalaryReceiptComponent } from './view-salary-receipt.component';

import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';

@NgModule({
  declarations: [ViewSalaryReceiptComponent],
  imports: [
    CommonModule,
    ViewSalaryReceiptRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class ViewSalaryReceiptModule {}
