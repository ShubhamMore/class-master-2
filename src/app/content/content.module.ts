import { AuthModule } from './../authentication/auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule, NbActionsModule } from '@nebular/theme';
import { ContentHeaderComponent } from './layout-component/content-header/content-header.component';
import { ContentFooterComponent } from './layout-component/content-footer/content-footer.component';

@NgModule({
  declarations: [HomeComponent, ContentComponent, ContentHeaderComponent, ContentFooterComponent],
  imports: [ContentRoutingModule, AuthModule, NbActionsModule, NbLayoutModule, ThemeModule],
})
export class ContentModule {}
