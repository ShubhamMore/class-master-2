import { AttendanceComponent } from './attendance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-attendance/manage-attendance.module').then(
            (m) => m.ManageAttendanceModule,
          ),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./add-attendance/add-attendance.module').then((m) => m.AddAttendanceModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./add-attendance/add-attendance.module').then((m) => m.AddAttendanceModule),
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

      { path: '**', redirectTo: 'page-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceRoutingModule {}
