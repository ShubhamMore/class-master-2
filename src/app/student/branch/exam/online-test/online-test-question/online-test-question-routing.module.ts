import { OnlineTestQuestionComponent } from './online-test-question.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OnlineTestQuestionComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-online-test-questions/manage-online-test-questions.module').then(
            (m) => m.ManageOnlineTestQuestionsModule,
          ),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./add-online-test-questions/add-online-test-questions.module').then(
            (m) => m.AddOnlineTestQuestionsModule,
          ),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./add-online-test-questions/add-online-test-questions.module').then(
            (m) => m.AddOnlineTestQuestionsModule,
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
export class OnlineTestQuestionRoutingModule {}
