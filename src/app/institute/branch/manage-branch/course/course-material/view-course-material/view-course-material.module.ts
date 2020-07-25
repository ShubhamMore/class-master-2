import { ViewCourseMaterialComponent } from './view-course-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCourseMaterialRoutingModule } from './view-course-material-routing.module';

@NgModule({
  declarations: [ViewCourseMaterialComponent],
  imports: [CommonModule, ViewCourseMaterialRoutingModule],
})
export class ViewCourseMaterialModule {}
