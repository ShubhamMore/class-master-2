import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { ManageScheduleComponent } from './manage-schedule/manage-schedule.component';
import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: 'manage',
        component: ManageScheduleComponent,
      },
      {
        path: 'add',
        component: AddScheduleComponent,
      },
      {
        path: 'edit/:id',
        component: AddScheduleComponent,
      },
      {
        path: 'view/:id',
        component: ViewScheduleComponent,
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
export class ScheduleRoutingModule {}
