import { NbCardModule, NbButtonModule, NbIconModule, NbProgressBarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';

@NgModule({
  declarations: [StorageComponent],
  imports: [
    CommonModule,
    StorageRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbProgressBarModule,
  ],
})
export class StorageModule {}
