import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

import { AdalConfigService } from './_services/adal-config.service';
import { AdalService } from 'ng2-adal/dist/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular adal app';

  constructor(
    private adalService: AdalService,
    private adalConfigService: AdalConfigService,
    private router: Router
  ) {
    this.adalService.init(this.adalConfigService.adalConfig);
    this.adalService.handleWindowCallback();
  }

  ngOnInit(): void {
  }
}
