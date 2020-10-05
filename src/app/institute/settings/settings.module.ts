import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from './../../@theme/theme.module';
import {
  NbCardModule,
  NbUserModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbTooltipModule,
} from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],

  imports: [
    CommonModule,
    ThemeModule,
    ReactiveFormsModule,
    NbCardModule,
    NbUserModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule {}
