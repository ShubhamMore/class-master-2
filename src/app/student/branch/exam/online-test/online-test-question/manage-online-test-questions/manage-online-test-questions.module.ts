import { ManageOnlineTestQuestionsComponent } from './manage-online-test-questions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOnlineTestQuestionsRoutingModule } from './manage-online-test-questions-routing.module';

@NgModule({
  declarations: [ManageOnlineTestQuestionsComponent],
  imports: [CommonModule, ManageOnlineTestQuestionsRoutingModule],
})
export class ManageOnlineTestQuestionsModule {}
