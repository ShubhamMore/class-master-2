import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { ManageAttendanceComponent } from './manage-attendance/manage-attendance.component';
import { AttendanceComponent } from './attendance.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    children: [
      {
        path: 'manage',
        component: ManageAttendanceComponent,
      },
      {
        path: 'add',
        component: AddAttendanceComponent,
      },
      {
        path: ':id/edit',
        component: AddAttendanceComponent,
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
export class AttendanceRoutingModule {}
