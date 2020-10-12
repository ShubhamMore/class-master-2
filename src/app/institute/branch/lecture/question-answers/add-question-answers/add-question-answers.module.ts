import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule, NbIconModule } from '@nebular/theme';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddQuestionAnswersRoutingModule } from './add-question-answers-routing.module';

@NgModule({
  declarations: [AddQuestionComponent, AddAnswerComponent],
  imports: [
    CommonModule,
    AddQuestionAnswersRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
  exports: [AddQuestionComponent, AddAnswerComponent],
})
export class AddQuestionAnswersModule {}
