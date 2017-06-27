import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdalService } from 'ng2-adal/core';
import { SecretService } from './_services/secret.service';

import { LoggedInGuard } from './_auth/logged-in.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestrictedComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AdalService,
    SecretService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
