import {
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbSpinnerModule,
  NbStepperModule,
  NbSelectModule,
  NbIconModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTestComponent } from './add-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTestRoutingModule } from './add-test-routing.module';

@NgModule({
  declarations: [AddTestComponent],
  imports: [
    CommonModule,
    AddTestRoutingModule,
    NbInputModule,
    NbIconModule,
    NbSelectModule,
    NbCardModule,
    NbSpinnerModule,
    NbStepperModule,
    NbButtonModule,
    ReactiveFormsModule,
  ],
})
export class AddTestModule {}
