import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'manage',
    loadChildren: () =>
      import('./manage-student-reports/manage-student-reports.module').then(
        (m) => m.ManageStudentReportsModule,
      ),
  },

  {
    path: 'course',
    loadChildren: () =>
      import('./student-courses/student-courses.module').then((m) => m.StudentCoursesModule),
  },

  {
    path: '',
    redirectTo: 'manage',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsReportRoutingModule {}
