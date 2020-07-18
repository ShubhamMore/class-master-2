import { ViewInstituteComponent } from './view-institute.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewInstituteRoutingModule } from './view-institute-routing.module';

import { ThemeModule } from './../../../@theme/theme.module';
import { NbCardModule, NbButtonModule, NbIconModule, NbTooltipModule } from '@nebular/theme';

@NgModule({
  declarations: [ViewInstituteComponent],
  imports: [
    CommonModule,
    ViewInstituteRoutingModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
  ],
})
export class ViewInstituteModule {}
