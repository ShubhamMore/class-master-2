import { ManageBranchComponent } from './manage-branch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBranchRoutingModule } from './manage-branch-routing.module';

@NgModule({
  declarations: [ManageBranchComponent],
  imports: [CommonModule, ManageBranchRoutingModule],
})
export class ManageBranchModule {}
