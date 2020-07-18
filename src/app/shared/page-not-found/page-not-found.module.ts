import { PageNotFoundComponent } from './page-not-found.component';
import { ThemeModule } from './../../@theme/theme.module';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, PageNotFoundRoutingModule, ThemeModule, NbCardModule, NbButtonModule],
})
export class PageNotFoundModule {}
