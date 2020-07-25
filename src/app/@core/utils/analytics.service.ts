import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

import { filter } from 'rxjs/operators';

declare const ga: any;

@Injectable()
export class AnalyticsService {
  private enabled: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
    this.enabled = false;
  }

  trackPageViews() {
    if (this.enabled) {
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        ga('send', { hitType: 'pageview', page: this.location.path() });
      });
    }
  }

  trackEvent(eventName: string) {
    if (this.enabled) {
      ga('send', 'event', eventName);
    }
  }
}
