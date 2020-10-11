import { AddAnswerComponent } from './../view-question-answers/add-answer/add-answer.component';
import { ViewQuestionAnswersComponent } from './view-question-answers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewQuestionAnswersRoutingModule } from './view-question-answers-routing.module';

@NgModule({
  declarations: [ViewQuestionAnswersComponent, AddAnswerComponent],
  imports: [CommonModule, ViewQuestionAnswersRoutingModule],
})
export class ViewQuestionAnswersModule {}
