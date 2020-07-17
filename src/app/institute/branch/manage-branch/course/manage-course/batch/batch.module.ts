import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
  NbCheckboxModule,
  NbStepperModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { ManageBatchComponent } from './manage-batch/manage-batch.component';
import { BatchComponent } from './batch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';

@NgModule({
  declarations: [BatchComponent, ManageBatchComponent, AddBatchComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbFormFieldModule,
    NbCheckboxModule,
    NbStepperModule,
    NbFormFieldModule,

    ReactiveFormsModule,
  ],
})
export class BatchModule {}
