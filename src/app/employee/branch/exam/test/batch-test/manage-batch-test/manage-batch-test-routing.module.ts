import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBatchTestComponent } from './manage-batch-test.component';

const routes: Routes = [
  { path: '', component: ManageBatchTestComponent },

  {
    path: 'page-not-found',
    loadChildren: () =>
      import('../../../../../../shared/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule,
      ),
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
export class ManageBatchTestRoutingModule {}
