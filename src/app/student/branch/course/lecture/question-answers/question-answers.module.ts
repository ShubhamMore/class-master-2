import { AddQuestionAnswersModule } from './add-question-answers/add-question-answers.module';
import { QuestionAnswersComponent } from './question-answers.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionAnswersRoutingModule } from './question-answers-routing.module';

@NgModule({
  declarations: [QuestionAnswersComponent],
  imports: [
    CommonModule,
    QuestionAnswersRoutingModule,
    AddQuestionAnswersModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
  ],
})
export class QuestionAnswersModule {}
