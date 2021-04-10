import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseMaterialRoutingModule } from './course-material-routing.module';
import { CourseMaterialComponent } from './course-material.component';

@NgModule({
  declarations: [CourseMaterialComponent],
  imports: [CommonModule, CourseMaterialRoutingModule],
})
export class CourseMaterialModule {}
