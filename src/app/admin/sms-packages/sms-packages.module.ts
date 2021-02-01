import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbSpinnerModule,
  NbIconModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsPackagesRoutingModule } from './sms-packages-routing.module';

import { SmsPackagesComponent } from './sms-packages.component';
import { SaveSmsPackageComponent } from './save-sms-package/save-sms-package.component';

@NgModule({
  declarations: [SmsPackagesComponent, SaveSmsPackageComponent],
  imports: [
    CommonModule,
    SmsPackagesRoutingModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
})
export class SmsPackagesModule {}
