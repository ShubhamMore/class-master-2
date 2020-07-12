import { ResetPasswordComponent } from './../authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './../authentication/forgot-password/forgot-password.component';
import { RegisterComponent } from './../authentication/register/register.component';
import { LoginComponent } from './../authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },

      { path: 'login', component: LoginComponent, canActivate: [] },

      { path: 'register', component: RegisterComponent, canActivate: [] },

      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [],
      },

      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [],
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      { path: 'page-not-found', component: PageNotFoundComponent },
      { path: '**', redirectTo: 'page-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
