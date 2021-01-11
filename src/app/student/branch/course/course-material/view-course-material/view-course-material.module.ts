import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCourseMaterialRoutingModule } from './view-course-material-routing.module';
import { ViewCourseMaterialComponent } from './view-course-material.component';

@NgModule({
  declarations: [ViewCourseMaterialComponent],
  imports: [
    CommonModule,
    ViewCourseMaterialRoutingModule,
    NbCardModule,
    NbButtonModule,
    PdfViewerModule,
  ],
})
export class ViewCourseMaterialModule {}
