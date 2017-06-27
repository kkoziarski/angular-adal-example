import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AdalService} from 'ng2-adal/core';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private adalService: AdalService, private router: Router) {}

  canActivate() {
      console.log('canActivate: ' + this.adalService.userInfo.isAuthenticated)
    if (this.adalService.userInfo.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/?unauthorized']);
      return false;
    }
  }
}
