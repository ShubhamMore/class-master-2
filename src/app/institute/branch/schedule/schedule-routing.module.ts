import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: 'batch',
        loadChildren: () =>
          import('./manage-schedule/manage-schedule.module').then((m) => m.ManageScheduleModule),
      },
      {
        path: 'batch-schedule',
        loadChildren: () =>
          import('./batch-schedule/batch-schedule.module').then((m) => m.BatchScheduleModule),
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
export class ScheduleRoutingModule {}
