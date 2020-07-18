import { AddLeadComponent } from './add-lead/add-lead.component';
import { LeadComponent } from './lead.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LeadComponent,
    children: [
      {
        path: 'add',
        loadChildren: () => import('./add-lead/add-lead.module').then((m) => m.AddLeadModule),
      },

      {
        path: 'edit',
        loadChildren: () => import('./add-lead/add-lead.module').then((m) => m.AddLeadModule),
      },

      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-lead/manage-lead.module').then((m) => m.ManageLeadModule),
      },
      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        loadChildren: () =>
          import('../../../shared/page-not-found/page-not-found.module').then(
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
export class LeadRoutingModule {}
