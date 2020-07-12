import { AddBatchComponent } from './add-batch/add-batch.component';
import { ManageBatchComponent } from './manage-batch/manage-batch.component';
import { BatchComponent } from './batch.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent,
    children: [
      {
        path: 'manage',
        component: ManageBatchComponent,
      },
      {
        path: 'add',
        component: AddBatchComponent,
      },
      {
        path: 'edit/:id',
        component: AddBatchComponent,
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
export class BatchRoutingModule {}
