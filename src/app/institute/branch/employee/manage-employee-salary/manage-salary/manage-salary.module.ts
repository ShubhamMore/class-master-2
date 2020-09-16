import {
  NbCardModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageSalaryRoutingModule } from './manage-salary-routing.module';
import { ManageSalaryComponent } from './manage-salary.component';

@NgModule({
  declarations: [ManageSalaryComponent],
  imports: [
    CommonModule,
    ManageSalaryRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    NbTooltipModule,
  ],
})
export class ManageSalaryModule {}
