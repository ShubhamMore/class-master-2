import { AddTestComponent } from './add-test/add-test.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { TestComponent } from './test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTestScoreComponent } from './add-test-score/add-test-score.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-test/manage-test.module').then((m) => m.ManageTestModule),
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
          import('../../../../shared/page-not-found/page-not-found.module').then(
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
export class TestRoutingModule {}
