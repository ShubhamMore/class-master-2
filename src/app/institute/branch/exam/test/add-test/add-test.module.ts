import { AddTestComponent } from './add-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTestRoutingModule } from './add-test-routing.module';

@NgModule({
  declarations: [AddTestComponent],
  imports: [CommonModule, AddTestRoutingModule],
})
export class AddTestModule {}
