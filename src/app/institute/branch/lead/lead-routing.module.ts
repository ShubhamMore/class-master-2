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
        component: AddLeadComponent,
      },
      {
        path: 'edit/:id',
        component: AddLeadComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadRoutingModule {}
