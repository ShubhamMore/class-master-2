import { EmployeeComponent } from './employee.component';
import { MenuService } from './menu.service';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from './../@theme/theme.module';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
  imports: [EmployeeRoutingModule, ThemeModule, NbMenuModule],
  declarations: [EmployeeComponent],
  providers: [MenuService],
})
export class EmployeeModule {}
