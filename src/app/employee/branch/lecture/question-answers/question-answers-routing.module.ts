import { QuestionAnswersComponent } from './question-answers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: QuestionAnswersComponent,
  },

  {
    path: 'view',
    loadChildren: () =>
      import('./view-question-answers/view-question-answers.module').then(
        (m) => m.ViewQuestionAnswersModule,
      ),
  },

  {
    path: 'page-not-found',
    loadChildren: () =>
      import('../../../../shared/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule,
      ),
  },

  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionAnswersRoutingModule {}
