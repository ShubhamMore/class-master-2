import { DiscountAndOfferComponent } from './discount-and-offer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountAndOfferRoutingModule } from './discount-and-offer-routing.module';

@NgModule({
  declarations: [DiscountAndOfferComponent],
  imports: [CommonModule, DiscountAndOfferRoutingModule],
})
export class DiscountAndOfferModule {}
