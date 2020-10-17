import { SharedModule } from './../../../../shared/shared.module';
import { OnlineLectureComponent } from './online-lecture/online-lecture.component';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbIconModule,
  NbButtonModule,
  NbInputModule,
  NbTooltipModule,
  NbAccordionModule,
  NbTabsetModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLectureRoutingModule } from './manage-lecture-routing.module';
import { ManageLectureComponent } from './manage-lecture.component';
import { SafeUrlPipe } from '../../../../pipe/safe-url.pipe';

@NgModule({
  declarations: [ManageLectureComponent, OnlineLectureComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManageLectureRoutingModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbAccordionModule,
    NbTabsetModule,
    NbFormFieldModule,
    FormsModule,
  ],
})
export class ManageLectureModule {}
