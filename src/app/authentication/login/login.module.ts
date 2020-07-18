import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

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
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
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
export class LoginModule {}
