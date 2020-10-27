import { BranchModel } from './../../../models/branch.model';
import { DateService } from './../../../services/shared-services/date.service';
import { NotificationService } from './../../../services/notification.service';
import { NotificationModel } from './../../../models/notification.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from './../../../services/branch.service';
import { SocketService } from './../../../services/socket.service';
import { AuthService } from './../../../authentication/auth/auth-service/auth.service';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import {
  NbDialogService,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
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

  branchId: string;
  branches: BranchModel[];
  userMenu: any[];

  notifications: NotificationModel[];
  unseenNotificationCount: number;
  socket: any;

  constructor(
    private sidebarService: NbSidebarService,
    private branchService: BranchService,
    private dialogService: NbDialogService,
    public dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private breakpointService: NbMediaBreakpointsService,
    private notificationService: NotificationService,
    private nbMenuService: NbMenuService,
    private socketService: SocketService,
  ) {}

  ngOnInit() {
    this.socketService.setupSocketConnection();

    this.branchId = '';
    this.branches = [];
    this.userMenu = [];
    this.notifications = [
      // {
      //   _id: '123',
      //   title: 'My Title',
      //   message:
      //     'My Message My Message My Message My Message My Message My Message My Message My Message ',
      //   date: 1602139523275,
      //   status: true,
      // },
    ];
    this.unseenNotificationCount = 0;

    this.user = this.authService.getUserData();
    this.socket = this.socketService.getSocket();

    this.getNotifications();

    this.userMenu = [];

    if (this.user.userRole !== 'admin') {
      this.userMenu.push({ title: 'Profile', link: '/' + this.user.userRole + '/profile' });
    }

    if (this.user.userRole === 'institute') {
      this.userMenu.push({ title: 'Settings', link: '/institute/settings' });
    }

    this.userMenu.push({ title: 'Logout' });

    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe((title) => {
        if (title === 'Logout') {
          this.logOut();
        }
      });

    this.branchService.getBranchesData().subscribe((branches: BranchModel[]) => {
      this.branches = branches;
    });

    this.branchService.getSelectedBranchId().subscribe((branchId: string) => {
      this.branchId = branchId;
    });

    // Listening to notifications
    this.socket.on('notify', (notification: NotificationModel) => {
      this.unseenNotificationCount++;
      this.notifications.splice(0, 0, notification);
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl));
  }

  changeSelectBranch(id: string) {
    if (id !== '') {
      this.branchService.setBranchId(id);
      this.router.navigate(['/' + this.user.userRole + '/branch/dashboard'], {
        relativeTo: this.route,
      });
    }
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe(
      (notifications: NotificationModel[]) => {
        this.notifications = notifications;
        if (notifications.length > 0) {
          this.unseenNotificationCount = notifications.filter(
            (notification: NotificationModel) => notification.status,
          ).length;
        }
      },
      (error: any) => {},
    );
  }

  openNotificationBox(
    notification: NotificationModel,
    i: number,
    notificationDialog: TemplateRef<any>,
  ) {
    this.dialogService.open(notificationDialog, { context: notification });
    this.notificationService.changeNotificationStatus(notification._id).subscribe(
      (res: any) => {
        this.notifications[i].status = true;

        if (this.unseenNotificationCount > 0) {
          this.unseenNotificationCount--;
        }
      },
      (error: any) => {},
    );
  }

  getNotificationLimitedTitle(title: string) {
    if (title.length <= 20) {
      return title;
    }
    return title.substr(0, 17).trim() + '...';
  }

  getNotificationLimitedMessage(message: string) {
    if (message.length <= 30) {
      return message;
    }
    return message.substr(0, 30).trim() + '...';
  }

  deleteNotification(id: string, status: boolean, i: number) {
    this.notificationService.deleteNotification(id).subscribe(
      (res: any) => {
        if (!status) {
          if (this.unseenNotificationCount > 0) {
            this.unseenNotificationCount--;
          }
        }
        this.notifications.splice(i, 1);
      },
      (error: any) => {},
    );
  }

  logOut() {
    this.authService.logout();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(false, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.socket.on('disconnect', () => {
      // console.log('Socket Disconnected');
    });
  }
}
