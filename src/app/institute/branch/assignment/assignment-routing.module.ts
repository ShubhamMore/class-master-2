import { AssignmentComponent } from './assignment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AssignmentComponent,
    children: [
      {
        path: 'batch',
        loadChildren: () =>
          import('./batch-assignment/batch-assignment.module').then((m) => m.BatchAssignmentModule),
      },

      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-assignment/manage-assignment.module').then(
            (m) => m.ManageAssignmentModule,
          ),
      },

      {
        path: 'submission',
        loadChildren: () =>
          import('./assignment-submission/assignment-submission.module').then(
            (m) => m.AssignmentSubmissionModule,
          ),
      },

      {
        path: 'add',
        loadChildren: () =>
          import('./save-assignment/save-assignment.module').then((m) => m.SaveAssignmentModule),
      },

      {
        path: 'edit',
        loadChildren: () =>
          import('./save-assignment/save-assignment.module').then((m) => m.SaveAssignmentModule),
      },

      {
        path: '',
        redirectTo: 'batch',
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
export class AssignmentRoutingModule {}
