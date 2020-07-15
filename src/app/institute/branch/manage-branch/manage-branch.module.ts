import { ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbButtonModule, NbCardModule } from '@nebular/theme';
import { ReceiptInfoComponent } from './receipt-info/receipt-info.component';
import { ManageBranchComponent } from './manage-branch.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBranchRoutingModule } from './manage-branch-routing.module';

@NgModule({
  declarations: [ManageBranchComponent, ReceiptInfoComponent],
  imports: [
    CommonModule,
    ManageBranchRoutingModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    ReactiveFormsModule,
  ],
})
export class ManageBranchModule {}
