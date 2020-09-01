import { NbCardModule, NbSelectModule, NbIconModule, NbButtonModule } from '@nebular/theme';
import { ManageTestComponent } from './manage-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageTestRoutingModule } from './manage-test-routing.module';

@NgModule({
  declarations: [ManageTestComponent],
  imports: [
    CommonModule,
    ManageTestRoutingModule,
    NbCardModule,
    NbSelectModule,
    NbIconModule,
    NbButtonModule,
  ],
})
export class ManageTestModule {}
