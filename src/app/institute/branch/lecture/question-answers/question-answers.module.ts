import { ReactiveFormsModule } from '@angular/forms';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionAnswersComponent } from './question-answers.component';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbUserModule,
  NbInputModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionAnswersRoutingModule } from './question-answers-routing.module';

@NgModule({
  declarations: [QuestionAnswersComponent, AddQuestionComponent],
  imports: [
    CommonModule,
    QuestionAnswersRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class QuestionAnswersModule {}
