import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageEmployeeSalaryComponent } from './manage-employee-salary.component';

const routes: Routes = [
  {
    path: '',
    component: ManageEmployeeSalaryComponent,
    children: [
      {
        path: 'add',
        loadChildren: () => import('./add-salary/add-salary.module').then((m) => m.AddSalaryModule),
      },

      {
        path: 'edit',
        loadChildren: () => import('./add-salary/add-salary.module').then((m) => m.AddSalaryModule),
      },

      {
        path: 'view',
        loadChildren: () =>
          import('./view-salary-receipt/view-salary-receipt.module').then(
            (m) => m.ViewSalaryReceiptModule,
          ),
      },

      {
        path: '',
        loadChildren: () =>
          import('./manage-salary/manage-salary.module').then((m) => m.ManageSalaryModule),
      },

      // {
      //   path: '',
      //   redirectTo: 'manage?type=active',
      //   pathMatch: 'full',
      // },

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
export class ManageEmployeeSalaryRoutingModule {}
