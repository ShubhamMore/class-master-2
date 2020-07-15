import { ReceiptInfoComponent } from './receipt-info/receipt-info.component';
import { AddBatchComponent } from './batch/add-batch/add-batch.component';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { CourseComponent } from './course/course.component';
import { ManageBranchComponent } from './manage-branch.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './batch/batch.component';

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
        path: 'batch',
        loadChildren: () => import('./batch/batch.module').then((m) => m.BatchModule),
      },

      {
        path: '',
        redirectTo: 'course',
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
