import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private authService : AuthService, private router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) return true;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
