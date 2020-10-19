import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamComponent } from './exam.component';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
    children: [
      {
        path: 'online-test',
        loadChildren: () =>
          import('./online-test/online-test.module').then((m) => m.OnlineTestModule),
      },

      {
        path: '',
        redirectTo: 'test',
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
export class ExamRoutingModule {}
