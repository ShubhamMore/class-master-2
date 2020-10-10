import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { ViewStudyMaterialComponent } from './view-study-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewStudyMaterialRoutingModule } from './view-study-material-routing.module';

@NgModule({
  declarations: [ViewStudyMaterialComponent],
  imports: [
    CommonModule,
    ViewStudyMaterialRoutingModule,
    NbCardModule,
    NbButtonModule,
    PdfViewerModule,
  ],
})
export class ViewStudyMaterialModule {}
