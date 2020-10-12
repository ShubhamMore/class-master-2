import { AddQuestionAnswersModule } from './../add-question-answers/add-question-answers.module';
import { NbCardModule, NbButtonModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { ViewQuestionAnswersComponent } from './view-question-answers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewQuestionAnswersRoutingModule } from './view-question-answers-routing.module';

@NgModule({
  declarations: [ViewQuestionAnswersComponent],
  imports: [
    CommonModule,
    ViewQuestionAnswersRoutingModule,
    AddQuestionAnswersModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
  ],
})
export class ViewQuestionAnswersModule {}
