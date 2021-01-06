import {
  NbTooltipModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { PlanTypeComponent } from './plan-type/plan-type.component';

@NgModule({
  declarations: [HistoryComponent, PlanTypeComponent],
  imports: [
    CommonModule,
    NbTooltipModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    HistoryRoutingModule,
  ],
})
export class HistoryModule {}
