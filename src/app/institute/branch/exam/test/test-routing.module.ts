import { TestComponent } from './test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'batch',
        loadChildren: () =>
          import('./manage-test/manage-test.module').then((m) => m.ManageTestModule),
      },

      {
        path: 'batch-test',
        loadChildren: () =>
          import('./batch-test/batch-test.module').then((m) => m.BatchTestModule),
      },

      {
        path: '',
        redirectTo: 'batch',
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
