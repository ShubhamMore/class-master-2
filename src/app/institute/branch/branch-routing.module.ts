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
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then((m) => m.ScheduleModule),
      },

      {
        path: 'attendance',
        loadChildren: () =>
          import('./attendance/attendance.module').then((m) => m.AttendanceModule),
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
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule),
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
