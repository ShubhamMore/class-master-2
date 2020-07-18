import { BatchComponent } from './batch.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-batch/manage-batch.module').then((m) => m.ManageBatchModule),
      },
      {
        path: 'add',
        loadChildren: () => import('./add-batch/add-batch.module').then((m) => m.AddBatchModule),
      },
      {
        path: 'edit',
        loadChildren: () => import('./add-batch/add-batch.module').then((m) => m.AddBatchModule),
      },

      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        loadChildren: () =>
          import('../../../../../shared/page-not-found/page-not-found.module').then(
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
export class BatchRoutingModule {}
