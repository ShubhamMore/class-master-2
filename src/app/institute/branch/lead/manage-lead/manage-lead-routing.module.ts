import { ManageLeadComponent } from './manage-lead.component';
import { ActiveLeadComponent } from './active-lead/active-lead.component';
import { InactiveLeadComponent } from './inactive-lead/inactive-lead.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageLeadComponent,
    children: [
      {
        path: 'active',
        component: ActiveLeadComponent,
      },
      {
        path: 'inactive',
        component: InactiveLeadComponent,
      },
      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageLeadRoutingModule {}
