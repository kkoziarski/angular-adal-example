import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdalService } from 'ng2-adal/core';
import { AdalConfigService } from './_services/adal-config.service';

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
    AdalConfigService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
