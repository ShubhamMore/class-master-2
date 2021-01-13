import { AddBatchComponent } from './add-batch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddBatchRoutingModule } from './add-batch-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbStepperModule,
  NbFormFieldModule,
} from '@nebular/theme';
@NgModule({
  declarations: [AddBatchComponent],
  imports: [
    CommonModule,
    AddBatchRoutingModule,

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
export class AddBatchModule {}
