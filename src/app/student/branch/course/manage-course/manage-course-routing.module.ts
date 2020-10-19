import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCourseComponent } from './manage-course.component';

const routes: Routes = [
  {
    path: '',
    component: ManageCourseComponent,
  },

  {
    path: 'page-not-found',
    loadChildren: () =>
      import('../../../../shared/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule,
      ),
  },

  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCourseRoutingModule {}