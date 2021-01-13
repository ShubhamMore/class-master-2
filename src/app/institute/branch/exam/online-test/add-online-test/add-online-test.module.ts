import { ReactiveFormsModule } from '@angular/forms';
import { AddOnlineTestComponent } from './add-online-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbInputModule,
  NbButtonModule,
  NbSpinnerModule,
  NbCardModule,
  NbStepperModule,
  NbSelectModule,
  NbIconModule,
} from '@nebular/theme';
import { AddOnlineTestRoutingModule } from './add-online-test-routing.module';

@NgModule({
  declarations: [AddOnlineTestComponent],
  imports: [
    CommonModule,
    AddOnlineTestRoutingModule,
    NbSpinnerModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbStepperModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
})
export class AddOnlineTestModule {}
