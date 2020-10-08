import { OnlineTestComponent } from './online-test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OnlineTestComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-online-test/manage-online-test.module').then(
            (m) => m.ManageOnlineTestModule,
          ),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./add-online-test/add-online-test.module').then((m) => m.AddOnlineTestModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./add-online-test/add-online-test.module').then((m) => m.AddOnlineTestModule),
      },
      {
        path: 'question',
        loadChildren: () =>
          import('./online-test-question/online-test-question.module').then(
            (m) => m.OnlineTestQuestionModule,
          ),
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
export class OnlineTestRoutingModule {}
