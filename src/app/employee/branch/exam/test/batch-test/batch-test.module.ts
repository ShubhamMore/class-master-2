import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchTestRoutingModule } from './batch-test-routing.module';
import { BatchTestComponent } from './batch-test.component';

@NgModule({
  declarations: [BatchTestComponent],
  imports: [CommonModule, BatchTestRoutingModule],
})
export class BatchTestModule {}
