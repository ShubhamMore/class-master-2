import { PassoutStudentComponent } from './passout-student/passout-student.component';
import { ActiveStudentComponent } from './active-student/active-student.component';
import { ManageStudentComponent } from './manage-student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageStudentComponent,
    children: [
      {
        path: 'active',
        component: ActiveStudentComponent,
      },

      {
        path: 'passout',
        component: PassoutStudentComponent,
      },

      {
        path: '',
        redirectTo: 'active',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageStudentRoutingModule {}
