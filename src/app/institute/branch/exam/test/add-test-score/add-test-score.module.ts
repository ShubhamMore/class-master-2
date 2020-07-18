import { AddTestScoreComponent } from './add-test-score.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTestScoreRoutingModule } from './add-test-score-routing.module';

@NgModule({
  declarations: [AddTestScoreComponent],
  imports: [CommonModule, AddTestScoreRoutingModule],
})
export class AddTestScoreModule {}
