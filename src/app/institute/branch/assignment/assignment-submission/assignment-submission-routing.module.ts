import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentSubmissionComponent } from './assignment-submission.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentSubmissionComponent,
  },

  {
    path: 'grade',
    loadChildren: () =>
      import('./submission-grading/submission-grading.module').then(
        (m) => m.SubmissionGradingModule,
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
export class AssignmentSubmissionRoutingModule {}
