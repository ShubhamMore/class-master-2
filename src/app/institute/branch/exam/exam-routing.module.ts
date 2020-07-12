import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamComponent } from './exam.component';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
    children: [
      {
        path: 'test',
        loadChildren: () => import('./test/test.module').then((m) => m.TestModule),
      },
      {
        path: 'online-test',
        loadChildren: () =>
          import('./online-test/online-test.module').then((m) => m.OnlineTestModule),
      },

      {
        path: '',
        redirectTo: 'test',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
