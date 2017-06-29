import { Component, OnInit } from '@angular/core';

import { SecretService } from './_services/secret.service';
import { AdalService } from './_services/adal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular adal app';

  constructor() {
  }

  ngOnInit(): void {
  }
}
