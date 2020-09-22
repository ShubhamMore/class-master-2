import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LectureRoutingModule } from './lecture-routing.module';
import { LectureComponent } from './lecture.component';

@NgModule({
  declarations: [LectureComponent],
  imports: [CommonModule, LectureRoutingModule],
})
export class LectureModule {}
