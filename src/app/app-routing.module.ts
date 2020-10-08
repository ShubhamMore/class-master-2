import { LoginAuthGuard } from './authentication/auth/guards/login.auth.guard';
import { StudentAuthGuard } from './authentication/auth/guards/student.auth.guard';
import { EmployeeAuthGuard } from './authentication/auth/guards/employee.auth.guard';
import { InstituteAuthGuard } from './authentication/auth/guards/institute.auth.guard';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'institute',
    loadChildren: () => import('./institute/institute.module').then((m) => m.InstituteModule),
    canActivate: [InstituteAuthGuard],
  },

  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule),
    canActivate: [EmployeeAuthGuard],
  },

  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
    canActivate: [StudentAuthGuard],
  },

  {
    path: '',
    loadChildren: () => import('./content/content.module').then((m) => m.ContentModule),
    canActivate: [LoginAuthGuard],
  },

  { path: '**', redirectTo: '/' },
];

const config: ExtraOptions = {
  useHash: true,
  relativeLinkResolution: 'corrected',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
