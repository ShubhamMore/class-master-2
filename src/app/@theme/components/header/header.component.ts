import { BranchService } from './../../../services/branch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchModel } from './../../../models/branch.model';
import { AuthService } from './../../../authentication/auth/auth-service/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  branches: any[];

  userMenu = [{ title: 'Profile', link: '/institute/profile' }];

  constructor(
    private sidebarService: NbSidebarService,
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private breakpointService: NbMediaBreakpointsService,
  ) {}

  ngOnInit() {
    this.branches = [];
    this.user = this.authService.getUserData();
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl));
  }

  changeSelect(e: any) {
    if (e !== '') {
      this.router.navigate(['/institute/branch/dashboard']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logOut() {
    this.authService.logout();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
