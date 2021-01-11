import { CourseMaterialComponent } from './course-material.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CourseMaterialComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import(
            // tslint:disable-next-line: trailing-comma
            './manage-course-material/manage-course-material.module'
          ).then((m) => m.ManageCourseMaterialModule),
      },

      {
        path: 'view',
        loadChildren: () =>
          import(
            // tslint:disable-next-line: trailing-comma
            './view-course-material/view-course-material.module'
          ).then((m) => m.ViewCourseMaterialModule),
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
export class CourseMaterialRoutingModule {}
