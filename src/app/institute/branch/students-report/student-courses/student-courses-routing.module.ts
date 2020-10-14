import { StudentCoursesComponent } from './student-courses.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StudentCoursesComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-student-course/manage-student-course.module').then(
            (m) => m.ManageStudentCourseModule,
          ),
      },

      {
        path: 'attendance',
        loadChildren: () =>
          import('./student-course-attendance/student-course-attendance.module').then(
            (m) => m.StudentCourseAttendanceModule,
          ),
      },

      {
        path: 'performance',
        loadChildren: () =>
          import('./student-course-performance/student-course-performance.module').then(
            (m) => m.StudentCoursePerformanceModule,
          ),
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
export class StudentCoursesRoutingModule {}
