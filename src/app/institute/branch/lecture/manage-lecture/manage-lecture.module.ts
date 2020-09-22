import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLectureRoutingModule } from './manage-lecture-routing.module';
import { ManageLectureComponent } from './manage-lecture.component';

@NgModule({
  declarations: [ManageLectureComponent],
  imports: [CommonModule, ManageLectureRoutingModule],
})
export class ManageLectureModule {}
