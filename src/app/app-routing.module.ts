import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { LoggedInGuard } from './_auth/logged-in.guard';

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
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
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
