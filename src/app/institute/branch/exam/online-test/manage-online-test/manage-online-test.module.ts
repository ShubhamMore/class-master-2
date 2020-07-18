import { ManageOnlineTestComponent } from './manage-online-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOnlineTestRoutingModule } from './manage-online-test-routing.module';

@NgModule({
  declarations: [ManageOnlineTestComponent],
  imports: [CommonModule, ManageOnlineTestRoutingModule],
})
export class ManageOnlineTestModule {}
