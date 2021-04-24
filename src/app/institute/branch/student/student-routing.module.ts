import { StudentComponent } from './student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./add-student/add-student.module').then((m) => m.AddStudentModule),
      },

      {
        path: 'edit',
        loadChildren: () =>
          import('./add-student/add-student.module').then((m) => m.AddStudentModule),
        data: { mode: 'edit' },
      },

      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-student/manage-student.module').then((m) => m.ManageStudentModule),
      },

      {
        path: 'course',
        loadChildren: () =>
          import('./student-course/student-course.module').then((m) => m.StudentCourseModule),
      },

      {
        path: '',
        redirectTo: 'manage?type=active',
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
export class StudentRoutingModule {}
