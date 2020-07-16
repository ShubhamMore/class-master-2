import { PageNotFoundComponent } from './../../../../shared/page-not-found/page-not-found.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
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
