import { ViewStudyMaterialComponent } from './view-study-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewStudyMaterialRoutingModule } from './view-study-material-routing.module';

@NgModule({
  declarations: [ViewStudyMaterialComponent],
  imports: [CommonModule, ViewStudyMaterialRoutingModule],
})
export class ViewStudyMaterialModule {}
