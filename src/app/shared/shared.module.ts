import { NbCardModule } from '@nebular/theme';
import { SafeUrlPipe } from './../pipe/safe-url.pipe';
import { SafeHtmlPipe } from './../pipe/safe-html.pipe';
import { NgModule } from '@angular/core';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [SafeHtmlPipe, SafeUrlPipe, TermsConditionsComponent],
  imports: [NbCardModule],
  exports: [SafeHtmlPipe, SafeUrlPipe, TermsConditionsComponent],
  bootstrap: [],
})
export class SharedModule {}
