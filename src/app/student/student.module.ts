import { NgModule } from '@angular/core';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';

import { MenuService } from './menu.service';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from './../@theme/theme.module';

@NgModule({
  declarations: [StudentComponent],
  imports: [StudentRoutingModule, ThemeModule, NbMenuModule],
  providers: [MenuService],
})
export class StudentModule {}
