import {
  NbCardModule,
  NbUserModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbTooltipModule,
  NbTabsetModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbCardModule,
    NbUserModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbTooltipModule,
    NbTabsetModule,
    NbFormFieldModule,
  ],
})
export class UsersModule {}
