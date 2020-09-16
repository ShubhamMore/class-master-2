import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewSalaryReceiptRoutingModule } from './view-salary-receipt-routing.module';
import { ViewSalaryReceiptComponent } from './view-salary-receipt.component';

@NgModule({
  declarations: [ViewSalaryReceiptComponent],
  imports: [CommonModule, ViewSalaryReceiptRoutingModule],
})
export class ViewSalaryReceiptModule {}
