import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  imports: [ThemeModule, NbCardModule, NbButtonModule],
  declarations: [PageNotFoundComponent],
})
export class MiscellaneousModule {}
