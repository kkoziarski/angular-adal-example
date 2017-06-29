import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { AdalService } from '../_services/adal.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private adalService: AdalService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.adalService.isAuthenticated) {
      const navigationExtras: NavigationExtras = {
        queryParams: { 'redirectUrl': route.url, 'x-redirected': 'yep' }
      };
      // this.router.navigate(['/unauthorized'], navigationExtras);
      this.router.navigate(['/unauthorized'], { queryParams: { 'x-redirected': 'yep' } });
      return false;
    }
    return true;
  }
}
