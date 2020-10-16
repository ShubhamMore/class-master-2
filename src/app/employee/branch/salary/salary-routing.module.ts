import { SalaryComponent } from './salary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SalaryComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-salary/manage-salary.module').then((m) => m.ManageSalaryModule),
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
        redirectTo: 'manage',
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
export class SalaryRoutingModule {}
