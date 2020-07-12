import { AddBatchComponent } from './add-batch/add-batch.component';
import { ManageBatchComponent } from './manage-batch/manage-batch.component';
import { BatchComponent } from './batch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';

@NgModule({
  declarations: [BatchComponent, ManageBatchComponent, AddBatchComponent],
  imports: [CommonModule, BatchRoutingModule],
})
export class BatchModule {}
