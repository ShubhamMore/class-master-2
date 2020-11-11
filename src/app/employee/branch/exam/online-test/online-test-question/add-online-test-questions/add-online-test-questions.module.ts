import { ReactiveFormsModule } from '@angular/forms';
import { AddOnlineTestQuestionsComponent } from './add-online-test-questions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOnlineTestQuestionsRoutingModule } from './add-online-test-questions-routing.module';

import {
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbStepperModule,
  NbSelectModule,
  NbIconModule,
  NbCheckboxModule,
} from '@nebular/theme';

@NgModule({
  declarations: [AddOnlineTestQuestionsComponent],
  imports: [
    CommonModule,
    AddOnlineTestQuestionsRoutingModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbStepperModule,
    NbSelectModule,
    NbIconModule,
    NbCheckboxModule,
    ReactiveFormsModule,
  ],
})
export class AddOnlineTestQuestionsModule {}
