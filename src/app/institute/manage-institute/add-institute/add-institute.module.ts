import { AddInstituteComponent } from './add-institute.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddInstituteRoutingModule } from './add-institute-routing.module';

import { ThemeModule } from './../../../@theme/theme.module';
import {
  NbCardModule,
  NbUserModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbFormFieldModule,
  NbStepperModule,
  NbAutocompleteModule,
} from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddInstituteComponent],
  imports: [
    CommonModule,
    AddInstituteRoutingModule,
    ThemeModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbInputModule,
    NbFormFieldModule,
    NbStepperModule,
    NbAutocompleteModule,
    NbButtonModule,
    NbTooltipModule,
  ],
})
export class AddInstituteModule {}
