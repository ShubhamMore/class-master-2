import {
  NbTooltipModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { BranchesComponent } from './branches.component';

@NgModule({
  declarations: [BranchesComponent],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
  ],
})
export class BranchesModule {}
