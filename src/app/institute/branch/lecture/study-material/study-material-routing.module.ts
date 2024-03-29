import { StudyMaterialComponent } from './study-material.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StudyMaterialComponent,
    children: [
      {
        path: 'manage',
        loadChildren: () =>
          import('./manage-study-material/manage-study-material.module').then(
            (m) => m.ManageStudyMaterialModule,
          ),
      },

      {
        path: 'add',
        loadChildren: () =>
          import('./add-study-material/add-study-material.module').then(
            (m) => m.AddStudyMaterialModule,
          ),
      },

      {
        path: 'edit',
        loadChildren: () =>
          import('./add-study-material/add-study-material.module').then(
            (m) => m.AddStudyMaterialModule,
          ),
        data: { mode: 'edit' },
      },

      {
        path: 'view',
        loadChildren: () =>
          import('./view-study-material/view-study-material.module').then(
            (m) => m.ViewStudyMaterialModule,
          ),
      },

      {
        path: '',
        redirectTo: 'manage',
        pathMatch: 'full',
      },

      {
        path: 'page-not-found',
        loadChildren: () =>
          import('../../../../shared/page-not-found/page-not-found.module').then(
            (m) => m.PageNotFoundModule,
          ),
      },

      { path: '**', redirectTo: 'page-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudyMaterialRoutingModule {}
