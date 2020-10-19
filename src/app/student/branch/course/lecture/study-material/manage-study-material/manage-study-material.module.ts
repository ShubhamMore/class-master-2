import { NbCardModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { ManageStudyMaterialComponent } from './manage-study-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStudyMaterialRoutingModule } from './manage-study-material-routing.module';

@NgModule({
  declarations: [ManageStudyMaterialComponent],
  imports: [
    CommonModule,
    ManageStudyMaterialRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
  ],
})
export class ManageStudyMaterialModule {}
