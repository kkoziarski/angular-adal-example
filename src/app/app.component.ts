import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecretService } from './_services/secret.service';
// import { AdalService } from 'ng2-adal/services/adal.service';
import { AdalService } from 'ng2-adal/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular adal app';

  constructor(
    private adalService: AdalService,
    private secretService: SecretService,
    private router: Router
  ) {
    this.adalService.init(this.secretService.adalConfig);
  }

  ngOnInit(): void {
    this.adalService.handleWindowCallback();
    this.adalService.getUser();
  }
}
