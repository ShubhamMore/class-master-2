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
        loadChildren: () =>
          import('./receipt-info/receipt-info.module').then((m) => m.ReceiptInfoModule),
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
export class ManageBranchRoutingModule {}
