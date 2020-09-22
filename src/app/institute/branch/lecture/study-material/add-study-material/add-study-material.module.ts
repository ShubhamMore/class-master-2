import { AddStudyMaterialComponent } from './add-study-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudyMaterialRoutingModule } from './add-study-material-routing.module';

@NgModule({
  declarations: [AddStudyMaterialComponent],
  imports: [CommonModule, AddStudyMaterialRoutingModule],
})
export class AddStudyMaterialModule {}
