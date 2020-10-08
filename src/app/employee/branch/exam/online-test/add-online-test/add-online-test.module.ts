import { AddOnlineTestComponent } from './add-online-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOnlineTestRoutingModule } from './add-online-test-routing.module';

@NgModule({
  declarations: [AddOnlineTestComponent],
  imports: [CommonModule, AddOnlineTestRoutingModule],
})
export class AddOnlineTestModule {}
