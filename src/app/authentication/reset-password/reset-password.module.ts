import { ResetPasswordComponent } from './reset-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from './../../@theme/theme.module';
import {
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbActionsModule,
  NbCheckboxModule,
  NbAlertModule,
  NbSelectModule,
} from '@nebular/theme';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbButtonModule,
    NbActionsModule,
    NbInputModule,
    NbCheckboxModule,
    NbAlertModule,
    NbSelectModule,
  ],
})
export class ResetPasswordModule {}
