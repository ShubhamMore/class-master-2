import { ManageBatchComponent } from './manage-batch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBatchRoutingModule } from './manage-batch-routing.module';

import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
@NgModule({
  declarations: [ManageBatchComponent],
  imports: [
    CommonModule,
    ManageBatchRoutingModule,

    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
  ],
})
export class ManageBatchModule {}
