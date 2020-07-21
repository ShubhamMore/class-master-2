import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectStudentCourseInstallmentComponent } from './collect-student-course-installment.component';

const routes: Routes = [
  {
    path: '',
    component: CollectStudentCourseInstallmentComponent,
  },

  {
    path: 'page-not-found',
    loadChildren: () =>
      import('../../../../../../shared/page-not-found/page-not-found.module').then(
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
export class CollectStudentCourseInstallmentRoutingModule {}
