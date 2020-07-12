import { AddOnlineTestQuestionsComponent } from './add-online-test-questions/add-online-test-questions.component';
import { AddOnlineTestComponent } from './add-online-test/add-online-test.component';
import { ManageOnlineTestComponent } from './manage-online-test/manage-online-test.component';
import { OnlineTestComponent } from './online-test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: OnlineTestComponent,
    children: [
      {
        path: 'manage',
        component: ManageOnlineTestComponent,
      },
      {
        path: 'add',
        component: AddOnlineTestComponent,
      },
      {
        path: ':id/edit',
        component: AddOnlineTestComponent,
      },
      {
        path: ':id/questions',
        component: ManageOnlineTestComponent,
      },
      {
        path: ':id/questions/add',
        component: AddOnlineTestQuestionsComponent,
      },
      {
        path: ':id/questions/:questionid/edit',
        component: AddOnlineTestQuestionsComponent,
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
export class OnlineTestRoutingModule {}
