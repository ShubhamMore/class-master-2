import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbTooltipModule,
  NbInputModule,
} from '@nebular/theme';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbFormFieldModule,
  ],
})
export class CheckoutModule {}
