import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [],
      },

      {
        path: 'login',
        loadChildren: () =>
          import('../authentication/login/login.module').then((m) => m.LoginModule),
        canActivate: [],
      },

      {
        path: 'register',
        loadChildren: () =>
          import('../authentication/register/register.module').then((m) => m.RegisterModule),
        canActivate: [],
      },

      {
        path: 'forgot-password',
        loadChildren: () =>
          import('../authentication/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule,
          ),
        canActivate: [],
      },

      {
        path: 'reset-password',
        loadChildren: () =>
          import('../authentication/reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule,
          ),
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

      { path: '**', redirectTo: 'page-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
