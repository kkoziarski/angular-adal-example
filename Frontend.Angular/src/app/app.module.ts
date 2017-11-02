import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdalService, OAuthData } from 'ng2-adal/dist/core';
import { AdalConfigService } from './_services/adal-config.service';
import { AuthService } from './_services/auth.service';
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
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AdalConfigService,
    AuthenticationGuard,
    AdalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
