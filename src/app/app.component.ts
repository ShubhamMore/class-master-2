import { isPlatformBrowser } from '@angular/common';
// import { LocationStrategy } from '@angular/common';
import { AuthService, UserData } from './authentication/auth/auth-service/auth.service';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet ></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private authService: AuthService, // private locationStrategy: LocationStrategy,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    // this.preventBackButton();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    if (isPlatformBrowser(this.platformId)) {
      const userData: UserData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }

      this.authService.autoLogin(userData);
    }
  }

  // preventBackButton() {
  //   history.pushState(null, null, location.href);
  //   this.locationStrategy.onPopState(() => {
  //     history.pushState(null, null, location.href);
  //   });
  // }
}
