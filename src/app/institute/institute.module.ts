import { InstituteComponent } from './institute.component';
import { MenuService } from './menu.service';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { InstituteRoutingModule } from './institute-routing.module';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [InstituteRoutingModule, ThemeModule, NbMenuModule],
  declarations: [InstituteComponent, PaymentComponent],
  providers: [MenuService],
})
export class InstituteModule {}
