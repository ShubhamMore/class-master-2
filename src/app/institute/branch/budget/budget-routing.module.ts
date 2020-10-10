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
        loadChildren: () =>
          import('./manage-budget/manage-budget.module').then((m) => m.ManageBudgetModule),
      },

      {
        path: 'add',
        loadChildren: () => import('./add-budget/add-budget.module').then((m) => m.AddBudgetModule),
      },

      {
        path: 'view',
        loadChildren: () =>
          import('./view-budget/view-budget.module').then((m) => m.ViewBudgetModule),
      },

      {
        path: 'summery',
        loadChildren: () =>
          import('./view-budget-summery/view-budget-summery.module').then(
            (m) => m.ViewBudgetSummeryModule,
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
export class BudgetRoutingModule {}
