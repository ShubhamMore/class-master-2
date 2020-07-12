import { BudgetComponent } from './budget.component';
import { ManageBudgetComponent } from './manage-budget/manage-budget.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BudgetComponent,
    children: [
      {
        path: 'manage',
        component: ManageBudgetComponent,
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
export class BudgetRoutingModule {}
