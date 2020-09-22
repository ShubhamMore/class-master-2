import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAttendanceComponent } from './add-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: AddAttendanceComponent,
  },

  {
    path: 'page-not-found',
    loadChildren: () =>
      import('../../../../../shared/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule,
      ),
  },

  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAttendanceRoutingModule {}
