import { ManageInstituteComponent } from './manage-institute.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageInstituteRoutingModule } from './manage-institute-routing.module';

import { ThemeModule } from './../../@theme/theme.module';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';

@NgModule({
  declarations: [ManageInstituteComponent],
  imports: [
    CommonModule,
    ManageInstituteRoutingModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbUserModule,
  ],
})
export class ManageInstituteModule {}
