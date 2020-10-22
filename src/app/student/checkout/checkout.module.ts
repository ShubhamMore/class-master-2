import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbFormFieldModule,
  ],
})
export class CheckoutModule {}
