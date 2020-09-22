import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchLectureRoutingModule } from './batch-lecture-routing.module';
import { BatchLectureComponent } from './batch-lecture.component';

@NgModule({
  declarations: [BatchLectureComponent],
  imports: [CommonModule, BatchLectureRoutingModule],
})
export class BatchLectureModule {}
