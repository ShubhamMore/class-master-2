import {
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbActionsModule,
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbCardModule,
    NbActionsModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
