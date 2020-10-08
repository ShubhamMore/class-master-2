import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { ViewCourseMaterialComponent } from './view-course-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewCourseMaterialRoutingModule } from './view-course-material-routing.module';

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
