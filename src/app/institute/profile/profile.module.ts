import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';

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

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ThemeModule,
    ReactiveFormsModule,
    NbCardModule,
    NbUserModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
  ],
})
export class ProfileModule {}
