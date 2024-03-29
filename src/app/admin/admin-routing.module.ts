import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [],
      },

      {
        path: 'institutes',
        loadChildren: () =>
          import('./institutes/institutes.module').then((m) => m.InstitutesModule),
        canActivate: [],
      },

      {
        path: 'coupon',
        loadChildren: () => import('./coupon/coupon.module').then((m) => m.CouponModule),
        canActivate: [],
      },

      {
        path: 'membership-plans',
        loadChildren: () =>
          import('./membership-plans/membership-plans.module').then((m) => m.MembershipPlansModule),
        canActivate: [],
      },

      {
        path: 'sms-packages',
        loadChildren: () =>
          import('./sms-packages/sms-packages.module').then((m) => m.SmsPackagesModule),
        canActivate: [],
      },

      {
        path: 'storage-packages',
        loadChildren: () =>
          import('./storage-packages/storage-packages.module').then((m) => m.StoragePackagesModule),
        canActivate: [],
      },

      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
        canActivate: [],
      },

      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
        canActivate: [],
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        loadChildren: () =>
          import('../shared/page-not-found/page-not-found.module').then(
            (m) => m.PageNotFoundModule,
          ),
      },

      {
        path: '**',
        redirectTo: 'page-not-found',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
