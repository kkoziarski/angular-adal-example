import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdalConfigService } from '../_services/adal-config.service';
import { AdalService } from 'ng2-adal/core';

@Component({
    selector: 'app-auth-callback',
    template: '<div><h3>Auth callback redirecting...</h3></div>'
})

export class AuthCallbackComponent implements OnInit {

    public message: string;

  constructor(
    private adalService: AdalService,
    private adalConfigService: AdalConfigService,
    private router: Router
  ) {
    this.adalService.init(this.adalConfigService.adalConfig);
  }

  ngOnInit(): void {
    this.adalService.handleWindowCallback();
    // this.adalService.getUser();
    if (this.adalService.userInfo.isAuthenticated) {
        this.router.navigate(['home']);
    }
    this.router.navigate(['home']);
  }
}
