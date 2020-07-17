import { PageNotFoundComponent } from './../../../../shared/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageDiscountAndOfferComponent } from './manage-discount-and-offer/manage-discount-and-offer.component';
import { AddDiscountAndOfferComponent } from './add-discount-and-offer/add-discount-and-offer.component';
import { DiscountAndOfferComponent } from './discount-and-offer.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountAndOfferComponent,
    children: [
      {
        path: 'manage',
        component: ManageDiscountAndOfferComponent,
      },
      {
        path: 'add',
        component: AddDiscountAndOfferComponent,
      },
      {
        path: 'edit',
        component: AddDiscountAndOfferComponent,
      },

      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        component: PageNotFoundComponent,
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
