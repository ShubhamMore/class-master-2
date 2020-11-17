import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineTestQuestionRoutingModule } from './online-test-question-routing.module';
import { OnlineTestQuestionComponent } from './online-test-question.component';

@NgModule({
  declarations: [OnlineTestQuestionComponent],
  imports: [
    CommonModule,
    OnlineTestQuestionRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbCheckboxModule,
  ],
})
export class OnlineTestQuestionModule {}
