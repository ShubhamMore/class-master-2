import { NbCardModule, NbUserModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchComponent } from './branch.component';
import { BranchHeaderComponent } from './branch-header/branch-header.component';

@NgModule({
  declarations: [BranchComponent, BranchHeaderComponent],
  imports: [CommonModule, BranchRoutingModule, NbCardModule, NbUserModule],
})
export class BranchModule {}
