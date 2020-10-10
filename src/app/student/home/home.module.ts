import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { ThemeModule } from './../../@theme/theme.module';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbUserModule,
  ],
})
export class HomeModule {}
