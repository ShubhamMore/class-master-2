import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchTestComponent } from './batch-test.component';

const routes: Routes = [
  {
    path: '',
    component: BatchTestComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-batch-test/manage-batch-test.module').then(
            (m) => m.ManageBatchTestModule,
          ),
      },

      {
        path: 'add',
        loadChildren: () => import('./add-test/add-test.module').then((m) => m.AddTestModule),
      },

      {
        path: 'edit',
        loadChildren: () => import('./add-test/add-test.module').then((m) => m.AddTestModule),
      },

      {
        path: 'score',
        loadChildren: () =>
          import('./add-test-score/add-test-score.module').then((m) => m.AddTestScoreModule),
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
export class BatchTestRoutingModule {}
