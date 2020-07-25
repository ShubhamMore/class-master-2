import { CourseMaterialComponent } from './course-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseMaterialRoutingModule } from './course-material-routing.module';

@NgModule({
  declarations: [CourseMaterialComponent],
  imports: [CommonModule, CourseMaterialRoutingModule],
})
export class CourseMaterialModule {}
