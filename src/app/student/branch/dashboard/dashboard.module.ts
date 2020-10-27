import { NbCardModule, NbInputModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, NbCardModule, NbButtonModule, NbIconModule],
})
export class DashboardModule {}
