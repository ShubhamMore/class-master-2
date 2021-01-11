import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course.component';

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
        path: 'material',
        loadChildren: () =>
          import('./course-material/course-material.module').then((m) => m.CourseMaterialModule),
      },

      {
        path: 'installment',
        loadChildren: () =>
          import('./course-installment/course-installment.module').then(
            (m) => m.CourseInstallmentModule,
          ),
      },

      {
        path: 'attendance',
        loadChildren: () =>
          import('./course-attendance/course-attendance.module').then(
            (m) => m.CourseAttendanceModule,
          ),
      },

      {
        path: 'performance',
        loadChildren: () =>
          import('./course-performance/course-performance.module').then(
            (m) => m.CoursePerformanceModule,
          ),
      },

      {
        path: 'lecture',
        loadChildren: () => import('./lecture/lecture.module').then((m) => m.LectureModule),
      },

      {
        path: 'assignment',
        loadChildren: () =>
          import('./assignment/assignment.module').then((m) => m.AssignmentModule),
      },

      {
        path: 'online-test',
        loadChildren: () =>
          import('./online-test/online-test.module').then((m) => m.OnlineTestModule),
      },

      {
        path: '',
        redirectTo: 'manage?type=course',
        pathMatch: 'full',
      },

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
export class CourseRoutingModule {}
