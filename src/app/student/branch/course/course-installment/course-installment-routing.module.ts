import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseInstallmentComponent } from './course-installment.component';

const routes: Routes = [
  {
    path: '',
    component: CourseInstallmentComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import(
            // tslint:disable-next-line: trailing-comma
            './manage-course-installment/manage-course-installment.module'
          ).then((m) => m.ManageCourseInstallmentModule),
      },

      {
        path: 'receipt',
        loadChildren: () =>
          import(
            // tslint:disable-next-line: trailing-comma
            './course-installment-receipt/course-installment-receipt.module'
          ).then((m) => m.CourseInstallmentReceiptModule),
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
export class CourseInstallmentRoutingModule {}
