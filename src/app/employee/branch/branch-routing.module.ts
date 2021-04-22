import { BranchComponent } from './branch.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: BranchComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },

      {
        path: 'manage-branch',
        loadChildren: () =>
          import('./manage-branch/manage-branch.module').then((m) => m.ManageBranchModule),
      },

      {
        path: 'my-salary',
        loadChildren: () => import('./salary/salary.module').then((m) => m.SalaryModule),
      },

      {
        path: 'my-leave',
        loadChildren: () => import('./my-leave/my-leave.module').then((m) => m.MyLeaveModule),
      },

      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then((m) => m.ScheduleModule),
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
        path: 'lead',
        loadChildren: () => import('./lead/lead.module').then((m) => m.LeadModule),
      },

      {
        path: 'exam',
        loadChildren: () => import('./exam/exam.module').then((m) => m.ExamModule),
      },

      {
        path: 'budget',
        loadChildren: () => import('./budget/budget.module').then((m) => m.BudgetModule),
      },

      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
      },

      {
        path: 'students-report',
        loadChildren: () =>
          import('./students-report/students-report.module').then((m) => m.StudentsReportModule),
      },

      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule),
      },

      {
        path: 'leave',
        loadChildren: () => import('./leave/leave.module').then((m) => m.LeaveModule),
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        loadChildren: () =>
          import('../../shared/page-not-found/page-not-found.module').then(
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
export class BranchRoutingModule {}
