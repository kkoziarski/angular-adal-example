import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdalService } from './_services/adal.service';
import { SecretService } from './_services/secret.service';

import { AuthenticationGuard } from './_auth/authentication.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestrictedComponent,
    UnauthorizedComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AdalService,
    SecretService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
