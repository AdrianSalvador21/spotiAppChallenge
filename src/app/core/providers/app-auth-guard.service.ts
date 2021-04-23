import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AppAuthGuardService implements CanActivate {

  public accessData = null;

  constructor(
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
      this.accessData = localStorage.getItem('accessData');
      if (this.accessData) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    }

}
