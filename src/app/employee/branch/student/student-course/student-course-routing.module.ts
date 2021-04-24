import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentCourseComponent } from './student-course.component';

const routes: Routes = [
  {
    path: '',
    component: StudentCourseComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-student-course/manage-student-course.module').then(
            (m) => m.ManageStudentCourseModule,
          ),
      },

      {
        path: 'add',
        loadChildren: () =>
          import('./add-student-course/add-student-course.module').then(
            (m) => m.AddStudentCourseModule,
          ),
      },

      {
        path: 'edit',
        loadChildren: () =>
          import('./add-student-course/add-student-course.module').then(
            (m) => m.AddStudentCourseModule,
          ),
        data: { mode: 'edit' },
      },

      {
        path: 'installment',
        loadChildren: () =>
          import('./student-course-installment/student-course-installment.module').then(
            (m) => m.StudentCourseInstallmentModule,
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
export class StudentCourseRoutingModule {}
