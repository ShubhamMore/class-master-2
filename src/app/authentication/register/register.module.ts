import { TermsConditionsComponent } from './../terms-conditions/terms-conditions.component';
import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';

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
  declarations: [RegisterComponent, TermsConditionsComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
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
export class RegisterModule {}
