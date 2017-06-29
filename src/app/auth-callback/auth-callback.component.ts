import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { SecretService } from '../_services/secret.service';
import { AdalService } from '../_services/adal.service';

@Component({
    selector: 'app-auth-callback',
    template: '<div><h3>Auth callback redirecting...</h3></div>'
})

export class AuthCallbackComponent implements OnInit {

    public message: string;

  constructor(
    private adalService: AdalService,
    private secretService: SecretService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.adalService.handleWindowCallback();

    if (!this.adalService.isAuthenticated) {
        this.router.navigate(['home'], { queryParams: { 'callback': 'no-auth'}});
        return;
    } else {
        this.router.navigate(['home'], { queryParams: { 'callback': 'auth'}});
    }
  }
}
