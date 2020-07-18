import { ManageStudentComponent } from './manage-student/manage-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
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
      },

      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-student/manage-student.module').then((m) => m.ManageStudentModule),
      },

      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      ,
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
