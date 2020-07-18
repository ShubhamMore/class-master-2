import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnlineTestRoutingModule } from './online-test-routing.module';
import { OnlineTestComponent } from './online-test.component';

@NgModule({
  declarations: [OnlineTestComponent],
  imports: [CommonModule, OnlineTestRoutingModule],
})
export class OnlineTestModule {}
