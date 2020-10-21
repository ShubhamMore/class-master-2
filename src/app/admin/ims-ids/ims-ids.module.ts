import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImsIdsRoutingModule } from './ims-ids-routing.module';
import { ImsIdsComponent } from './ims-ids.component';

@NgModule({
  declarations: [ImsIdsComponent],
  imports: [
    CommonModule,
    ImsIdsRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
})
export class ImsIdsModule {}
