import { LectureComponent } from './lecture.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LectureComponent,
    children: [
      {
        path: 'batch',
        loadChildren: () =>
          import('./batch-lecture/batch-lecture.module').then((m) => m.BatchLectureModule),
      },

      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-lecture/manage-lecture.module').then((m) => m.ManageLectureModule),
      },

      {
        path: 'view',
        loadChildren: () =>
          import('./view-lecture/view-lecture.module').then((m) => m.ViewLectureModule),
      },

      {
        path: 'material',
        loadChildren: () =>
          import('./study-material/study-material.module').then((m) => m.StudyMaterialModule),
      },

      {
        path: 'attendance',
        loadChildren: () =>
          import('./attendance/attendance.module').then((m) => m.AttendanceModule),
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
export class LectureRoutingModule {}
