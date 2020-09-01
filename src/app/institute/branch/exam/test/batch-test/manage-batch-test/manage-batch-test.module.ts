import { NbCardModule, NbSelectModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBatchTestRoutingModule } from './manage-batch-test-routing.module';
import { ManageBatchTestComponent } from './manage-batch-test.component';

@NgModule({
  declarations: [ManageBatchTestComponent],
  imports: [
    CommonModule,
    ManageBatchTestRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class ManageBatchTestModule {}
