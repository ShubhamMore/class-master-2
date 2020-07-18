import { BranchAuthGuard } from './../authentication/auth/guards/branch.auth.guard';
import { PageNotFoundComponent } from './../shared/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstituteComponent } from './institute.component';

const routes: Routes = [
  {
    path: '',
    component: InstituteComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [],
      },

      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [],
      },

      {
        path: 'my-institutes',
        loadChildren: () =>
          import('./manage-institute/manage-institute.module').then((m) => m.ManageInstituteModule),
        canActivate: [],
      },

      {
        path: 'membership-plans',
        loadChildren: () =>
          import('./membership-plans/membership-plans.module').then((m) => m.MembershipPlansModule),
        canActivate: [],
      },

      {
        path: 'add',
        loadChildren: () =>
          import('./manage-institute/add-institute/add-institute.module').then(
            (m) => m.AddInstituteModule,
          ),
        canActivate: [],
      },
      {
        path: 'view',
        loadChildren: () =>
          import('./manage-institute/view-institute/view-institute.module').then(
            (m) => m.ViewInstituteModule,
          ),
        canActivate: [],
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./manage-institute/add-institute/add-institute.module').then(
            (m) => m.AddInstituteModule,
          ),
        canActivate: [],
      },

      {
        path: 'branch',
        loadChildren: () => import('./branch/branch.module').then((m) => m.BranchModule),
        canActivate: [BranchAuthGuard],
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
export class InstituteRoutingModule {}
