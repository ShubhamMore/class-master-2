import { NgModule } from '@angular/core';
import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule, NbActionsModule } from '@nebular/theme';
import { ContentHeaderComponent } from './layout-component/content-header/content-header.component';
import { ContentFooterComponent } from './layout-component/content-footer/content-footer.component';

@NgModule({
  declarations: [ContentComponent, ContentHeaderComponent, ContentFooterComponent],
  imports: [ContentRoutingModule, NbActionsModule, NbLayoutModule, ThemeModule],
})
export class ContentModule {}
