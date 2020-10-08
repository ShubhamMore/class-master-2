import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';
import { AddStudyMaterialComponent } from './add-study-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudyMaterialRoutingModule } from './add-study-material-routing.module';

@NgModule({
  declarations: [AddStudyMaterialComponent],
  imports: [
    CommonModule,
    AddStudyMaterialRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class AddStudyMaterialModule {}
