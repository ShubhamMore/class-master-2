import { BranchAuthGuard } from './../authentication/auth/guards/branch.auth.guard';
import { MembershipPlansComponent } from './membership-plans/membership-plans.component';
import { ManageInstituteComponent } from './manage-institute/manage-institute.component';
import { AddInstituteComponent } from './manage-institute/add-institute/add-institute.component';
import { PageNotFoundComponent } from './../shared/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { InstituteComponent } from './institute.component';
import { ProfileComponent } from './profile/profile.component';
import { MyInstitutesComponent } from './my-institutes/my-institutes.component';
import { ViewInstituteComponent } from './manage-institute/view-institute/view-institute.component';

const routes: Routes = [
  {
    path: '',
    component: InstituteComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'my-institutes',
        component: MyInstitutesComponent,
      },

      {
        path: 'membership-plans',
        component: MembershipPlansComponent,
      },

      {
        path: 'add',
        component: AddInstituteComponent,
      },
      {
        path: 'manage',
        component: ManageInstituteComponent,
      },
      {
        path: 'view/:id',
        component: ViewInstituteComponent,
      },
      {
        path: 'edit/:id',
        component: AddInstituteComponent,
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
        component: PageNotFoundComponent,
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
