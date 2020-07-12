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
        path: 'edit/:id',
        component: AddCourseComponent,
      },

      {
        path: '',
        redirectTo: 'manage',
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
