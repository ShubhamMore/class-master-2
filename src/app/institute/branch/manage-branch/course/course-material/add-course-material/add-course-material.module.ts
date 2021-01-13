import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbSpinnerModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';
import { AddCourseMaterialComponent } from './add-course-material.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCourseMaterialRoutingModule } from './add-course-material-routing.module';

@NgModule({
  declarations: [AddCourseMaterialComponent],
  imports: [
    CommonModule,
    AddCourseMaterialRoutingModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbTooltipModule,
    NbSpinnerModule,
    NbButtonModule,
    NbSelectModule,
  ],
})
export class AddCourseMaterialModule {}
