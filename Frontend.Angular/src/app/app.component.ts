import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdalConfigService } from './_services/adal-config.service';
import { AdalService } from 'ng2-adal/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular adal app';

  constructor(
    private adalService: AdalService,
    private adalConfigService: AdalConfigService,
    private router: Router
  ) {
    this.adalService.init(this.adalConfigService.adalConfig);
  }

  ngOnInit(): void {
    // this.adalService.handleWindowCallback();
    // this.adalService.getUser();
    // if (this.adalService.userInfo.isAuthenticated) {
    //     this.router.navigate(['home']);
    // }
  }
}
