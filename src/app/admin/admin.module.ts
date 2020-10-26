import { UserService } from './services/user.service';
import { InstituteService } from './services/institute.service';
import { AdminZoomService } from './services/admin-zoom.service';
import { MenuService } from './menu.service';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from './../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, ThemeModule, NbMenuModule, AdminRoutingModule],
  providers: [MenuService, AdminZoomService, InstituteService, UserService],
})
export class AdminModule {}
