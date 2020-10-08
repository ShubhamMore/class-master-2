import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscountAndOfferComponent } from './discount-and-offer.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountAndOfferComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-discount-and-offer/manage-discount-and-offer.module').then(
            (m) => m.ManageDiscountAndOfferModule,
          ),
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./add-discount-and-offer/add-discount-and-offer.module').then(
            (m) => m.AddDiscountAndOfferModule,
          ),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./add-discount-and-offer/add-discount-and-offer.module').then(
            (m) => m.AddDiscountAndOfferModule,
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
export class DiscountAndOfferRoutingModule {}
