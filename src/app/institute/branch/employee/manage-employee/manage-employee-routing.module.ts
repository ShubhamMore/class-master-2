import { InactiveEmployeeComponent } from './inactive-employee/inactive-employee.component';
import { ActiveEmployeeComponent } from './active-employee/active-employee.component';
import { ManageEmployeeComponent } from './manage-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageEmployeeComponent,
    children: [
      {
        path: 'active',
        component: ActiveEmployeeComponent,
      },
      {
        path: 'inactive',
        component: InactiveEmployeeComponent,
      },

      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageEmployeeRoutingModule {}
