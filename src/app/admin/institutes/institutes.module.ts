import {
  NbIconModule,
  NbSelectModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutesRoutingModule } from './institutes-routing.module';
import { InstitutesComponent } from './institutes.component';

@NgModule({
  declarations: [InstitutesComponent],
  imports: [
    CommonModule,
    InstitutesRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
})
export class InstitutesModule {}
