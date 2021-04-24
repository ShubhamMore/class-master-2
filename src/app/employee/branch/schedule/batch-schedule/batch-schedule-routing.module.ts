import { BatchScheduleComponent } from './batch-schedule.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BatchScheduleComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-batch-schedule/manage-batch-schedule.module').then(
            (m) => m.ManageBatchScheduleModule,
          ),
      },

      {
        path: 'add',
        loadChildren: () =>
          import('./add-schedule/add-schedule.module').then((m) => m.AddScheduleModule),
      },

      {
        path: 'edit',
        loadChildren: () =>
          import('./add-schedule/add-schedule.module').then((m) => m.AddScheduleModule),
        data: { mode: 'edit' },
      },

      {
        path: 'view',
        loadChildren: () =>
          import('./view-schedule/view-schedule.module').then((m) => m.ViewScheduleModule),
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
export class BatchScheduleRoutingModule {}
