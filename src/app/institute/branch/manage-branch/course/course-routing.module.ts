import { PageNotFoundComponent } from './../../../../shared/page-not-found/page-not-found.component';

import { AddCourseComponent } from './manage-course/add-course/add-course.component';
import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCourseComponent } from './manage-course/manage-course.component';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      {
        path: 'manage',
        component: ManageCourseComponent,
      },
      {
        path: 'add',
        component: AddCourseComponent,
      },
      {
        path: 'edit',
        component: AddCourseComponent,
      },

      {
        path: 'batch',
        loadChildren: () => import('./manage-course/batch/batch.module').then((m) => m.BatchModule),
      },

      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        component: PageNotFoundComponent,
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
export class CourseRoutingModule {}
