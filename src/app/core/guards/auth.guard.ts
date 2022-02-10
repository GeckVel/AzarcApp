import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleAuthService } from '../services/google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private googleAuthService: GoogleAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve) => {
      this.googleAuthService.checkIfUserAuthenticated()
        .then((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            this.navigateToLogin();
          }
          resolve(isAuthenticated);
        })
        .catch(() => {
          this.navigateToLogin();
          resolve(false);
        });
    });
  }

  protected navigateToLogin(): void {
    this.router.navigateByUrl('login');
  }

}
