import { ManageStudentComponent } from './manage-student/manage-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentComponent } from './student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'add',
        component: AddStudentComponent,
      },
      {
        path: 'edit',
        component: AddStudentComponent,
      },

      {
        path: 'manage',
        component: ManageStudentComponent,
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
export class StudentRoutingModule {}
