import { AddTestComponent } from './add-test/add-test.component';
import { ManageTestComponent } from './manage-test/manage-test.component';
import { TestComponent } from './test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTestScoreComponent } from './add-test-score/add-test-score.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      {
        path: 'manage',
        component: ManageTestComponent,
      },
      {
        path: 'add',
        component: AddTestComponent,
      },
      {
        path: ':id/edit',
        component: AddTestComponent,
      },
      {
        path: ':id/score',
        component: AddTestScoreComponent,
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
export class TestRoutingModule {}
