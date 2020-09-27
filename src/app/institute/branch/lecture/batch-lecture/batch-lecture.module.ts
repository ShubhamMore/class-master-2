import {
  NbCardModule,
  NbTooltipModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbAccordionModule,
  NbFormFieldModule,
  NbSelectModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchLectureRoutingModule } from './batch-lecture-routing.module';
import { BatchLectureComponent } from './batch-lecture.component';

@NgModule({
  declarations: [BatchLectureComponent],
  imports: [
    CommonModule,
    BatchLectureRoutingModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbFormFieldModule,
    NbSelectModule,
  ],
})
export class BatchLectureModule {}
