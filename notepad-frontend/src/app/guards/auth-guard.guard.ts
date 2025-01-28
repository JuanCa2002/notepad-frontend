import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginRouterConstants } from '../constants/routers/login/login-router-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      this.router.navigate(['/'+LoginRouterConstants.LOGIN_ROUTER]);
      return false;
    }
  }
}