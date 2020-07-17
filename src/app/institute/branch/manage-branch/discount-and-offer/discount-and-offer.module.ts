import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbFormFieldModule,
  NbCheckboxModule,
  NbStepperModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountAndOfferRoutingModule } from './discount-and-offer-routing.module';
import { DiscountAndOfferComponent } from './discount-and-offer.component';
import { AddDiscountAndOfferComponent } from './add-discount-and-offer/add-discount-and-offer.component';
import { ManageDiscountAndOfferComponent } from './manage-discount-and-offer/manage-discount-and-offer.component';

@NgModule({
  declarations: [
    DiscountAndOfferComponent,
    AddDiscountAndOfferComponent,
    ManageDiscountAndOfferComponent,
  ],
  imports: [
    CommonModule,
    DiscountAndOfferRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbCheckboxModule,
    NbStepperModule,
    NbFormFieldModule,

    ReactiveFormsModule,
  ],
})
export class DiscountAndOfferModule {}
