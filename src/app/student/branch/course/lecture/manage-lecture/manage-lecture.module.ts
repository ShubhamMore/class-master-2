import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbTooltipModule,
  NbAccordionModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLectureRoutingModule } from './manage-lecture-routing.module';
import { ManageLectureComponent } from './manage-lecture.component';

@NgModule({
  declarations: [ManageLectureComponent],
  imports: [
    CommonModule,
    ManageLectureRoutingModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbFormFieldModule,
    FormsModule,
  ],
})
export class ManageLectureModule {}
