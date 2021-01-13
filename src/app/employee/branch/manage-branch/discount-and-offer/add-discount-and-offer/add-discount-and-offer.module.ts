import { AddDiscountAndOfferComponent } from './add-discount-and-offer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDiscountAndOfferRoutingModule } from './add-discount-and-offer-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbFormFieldModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbStepperModule,
} from '@nebular/theme';
@NgModule({
  declarations: [AddDiscountAndOfferComponent],
  imports: [
    CommonModule,
    AddDiscountAndOfferRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbStepperModule,
    NbFormFieldModule,

    ReactiveFormsModule,
  ],
})
export class AddDiscountAndOfferModule {}
