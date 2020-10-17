import { SafeUrlPipe } from './../pipe/safe-url.pipe';
import { SafeHtmlPipe } from './../pipe/safe-html.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SafeHtmlPipe, SafeUrlPipe],
  imports: [],
  exports: [SafeHtmlPipe, SafeUrlPipe],
  bootstrap: [],
})
export class SharedModule {}
