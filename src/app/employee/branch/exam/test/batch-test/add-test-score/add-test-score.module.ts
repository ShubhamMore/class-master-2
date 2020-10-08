import { NbCardModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTestScoreComponent } from './add-test-score.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTestScoreRoutingModule } from './add-test-score-routing.module';

@NgModule({
  declarations: [AddTestScoreComponent],
  imports: [
    CommonModule,
    AddTestScoreRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule,
  ],
})
export class AddTestScoreModule {}
