import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbUserModule,
} from '@nebular/theme';
import { AddAnswerComponent } from './../view-question-answers/add-answer/add-answer.component';
import { ViewQuestionAnswersComponent } from './view-question-answers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewQuestionAnswersRoutingModule } from './view-question-answers-routing.module';

@NgModule({
  declarations: [ViewQuestionAnswersComponent, AddAnswerComponent],
  imports: [
    CommonModule,
    ViewQuestionAnswersRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
    ReactiveFormsModule,
  ],
})
export class ViewQuestionAnswersModule {}
