import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

import { AuthenticationGuard } from './_auth/authentication.guard';

const appRoutes: Routes = [
//   {
//     path: '',
//     redirectTo: '/home',
//     pathMatch: 'full'
//   },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'restricted',
    component: RestrictedComponent,
    canActivate: [ AuthenticationGuard ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
