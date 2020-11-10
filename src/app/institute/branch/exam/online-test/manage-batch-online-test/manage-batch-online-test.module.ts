import { NbCardModule, NbSelectModule, NbIconModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBatchOnlineTestRoutingModule } from './manage-batch-online-test-routing.module';
import { ManageBatchOnlineTestComponent } from './manage-batch-online-test.component';

@NgModule({
  declarations: [ManageBatchOnlineTestComponent],
  imports: [
    CommonModule,
    ManageBatchOnlineTestRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
  ],
})
export class ManageBatchOnlineTestModule {}
