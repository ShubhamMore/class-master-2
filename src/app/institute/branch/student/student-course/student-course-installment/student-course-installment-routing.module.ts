import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentCourseInstallmentComponent } from './student-course-installment.component';

const routes: Routes = [
  {
    path: '',
    component: StudentCourseInstallmentComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import(
            // tslint:disable-next-line: trailing-comma
            './manage-student-course-installment/manage-student-course-installment.module'
          ).then((m) => m.ManageStudentCourseInstallmentModule),
      },

      {
        path: 'add',
        loadChildren: () =>
          import('./get-student-course-installment/get-student-course-installment.module').then(
            (m) => m.GetStudentCourseInstallmentModule,
          ),
      },

      {
        path: 'edit',
        loadChildren: () =>
          import('./get-student-course-installment/get-student-course-installment.module').then(
            (m) => m.GetStudentCourseInstallmentModule,
          ),
      },

      {
        path: 'receipt',
        loadChildren: () =>
          import(
            // tslint:disable-next-line: trailing-comma
            './student-course-installment-receipt/student-course-installment-receipt.module'
          ).then((m) => m.StudentCourseInstallmentReceiptModule),
      },

      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        loadChildren: () =>
          import('../../../../../shared/page-not-found/page-not-found.module').then(
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
export class StudentCourseInstallmentRoutingModule {}
