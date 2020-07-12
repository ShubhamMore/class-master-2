import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineTestRoutingModule } from './online-test-routing.module';
import { OnlineTestComponent } from './online-test.component';
import { ManageOnlineTestComponent } from './manage-online-test/manage-online-test.component';
import { AddOnlineTestComponent } from './add-online-test/add-online-test.component';
import { ManageOnlineTestQuestionsComponent } from './manage-online-test-questions/manage-online-test-questions.component';
import { AddOnlineTestQuestionsComponent } from './add-online-test-questions/add-online-test-questions.component';


@NgModule({
  declarations: [OnlineTestComponent, ManageOnlineTestComponent, AddOnlineTestComponent, ManageOnlineTestQuestionsComponent, AddOnlineTestQuestionsComponent],
  imports: [
    CommonModule,
    OnlineTestRoutingModule
  ]
})
export class OnlineTestModule { }
