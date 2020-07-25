import { CourseComponent } from './course.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-course/manage-course.module').then((m) => m.ManageCourseModule),
      },
      {
        path: 'add',
        loadChildren: () => import('./add-course/add-course.module').then((m) => m.AddCourseModule),
      },
      {
        path: 'edit',
        loadChildren: () => import('./add-course/add-course.module').then((m) => m.AddCourseModule),
      },

      {
        path: 'batch',
        loadChildren: () => import('./batch/batch.module').then((m) => m.BatchModule),
      },

      {
        path: 'course-material',
        loadChildren: () =>
          import('./course-material/course-material.module').then((m) => m.CourseMaterialModule),
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
export class CourseRoutingModule {}
