import { TransactionComponent } from './transaction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TransactionComponent, canActivate: [] },

  {
    path: 'view',
    loadChildren: () =>
      import('./view-transaction/view-transaction.module').then((m) => m.ViewTransactionModule),
  },

  {
    path: 'page-not-found',
    loadChildren: () =>
      import('../../shared/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },

  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
