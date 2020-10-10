import { AddOnlineTestQuestionsComponent } from './add-online-test-questions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOnlineTestQuestionsRoutingModule } from './add-online-test-questions-routing.module';

@NgModule({
  declarations: [AddOnlineTestQuestionsComponent],
  imports: [CommonModule, AddOnlineTestQuestionsRoutingModule],
})
export class AddOnlineTestQuestionsModule {}
