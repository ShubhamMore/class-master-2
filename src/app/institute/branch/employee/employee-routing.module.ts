import { PageNotFoundComponent } from './../../../shared/page-not-found/page-not-found.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { EmployeeComponent } from './employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: 'add',
        loadChildren: () =>
          import('./add-employee/add-employee.module').then((m) => m.AddEmployeeModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./add-employee/add-employee.module').then((m) => m.AddEmployeeModule),
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-employee/manage-employee.module').then((m) => m.ManageEmployeeModule),
      },

      {
        path: '',
        redirectTo: 'manage?type=active',
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
export class EmployeeRoutingModule {}
