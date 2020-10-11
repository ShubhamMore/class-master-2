import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbIconModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { AddQuestionComponent } from './add-question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddQuestionRoutingModule } from './add-question-routing.module';

@NgModule({
  declarations: [AddQuestionComponent],
  imports: [
    CommonModule,
    AddQuestionRoutingModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
  ],
})
export class AddQuestionModule {}
