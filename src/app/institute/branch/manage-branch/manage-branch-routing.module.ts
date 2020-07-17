import { PageNotFoundComponent } from './../../../shared/page-not-found/page-not-found.component';
import { ReceiptInfoComponent } from './receipt-info/receipt-info.component';
import { ManageBranchComponent } from './manage-branch.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageBranchComponent,
    children: [
      {
        path: 'receipt',
        component: ReceiptInfoComponent,
      },

      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then((m) => m.CourseModule),
      },

      {
        path: 'discount-and-offers',
        loadChildren: () =>
          import('./discount-and-offer/discount-and-offer.module').then(
            (m) => m.DiscountAndOfferModule,
          ),
      },

      {
        path: '',
        redirectTo: 'course',
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
export class ManageBranchRoutingModule {}
