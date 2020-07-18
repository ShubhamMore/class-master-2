import { ManageDiscountAndOfferRoutingModule } from './manage-discount-and-offer-routing.module';
import { ManageDiscountAndOfferComponent } from './manage-discount-and-offer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
@NgModule({
  declarations: [ManageDiscountAndOfferComponent],
  imports: [
    CommonModule,
    ManageDiscountAndOfferRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class ManageDiscountAndOfferModule {}
