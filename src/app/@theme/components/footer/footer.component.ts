import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by TEAM
      <strong><a href="https://www.google.com" target="_blank">THE CLASS MASTER</a></strong> 2020
    </span>
  `,
})
export class FooterComponent {}
