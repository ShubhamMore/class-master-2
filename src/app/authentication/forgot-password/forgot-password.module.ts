import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

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
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
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
export class ForgotPasswordModule {}
