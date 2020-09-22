import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewLectureRoutingModule } from './view-lecture-routing.module';
import { ViewLectureComponent } from './view-lecture.component';

@NgModule({
  declarations: [ViewLectureComponent],
  imports: [CommonModule, ViewLectureRoutingModule],
})
export class ViewLectureModule {}
