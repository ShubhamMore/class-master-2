import { InstitutesComponent } from './institutes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: InstitutesComponent,
  },

  {
    path: 'branch',
    loadChildren: () => import('./branches/branches.module').then((m) => m.BranchesModule),
  },

  {
    path: 'page-not-found',
    loadChildren: () =>
      import('../../shared/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },

  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutesRoutingModule {}
