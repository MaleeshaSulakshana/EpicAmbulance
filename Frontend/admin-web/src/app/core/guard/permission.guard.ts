import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');

    // has permission or super.admin so return true
    if (permissions.find((x: string) => x === next.data.permission || x === 'super.admin')) {
      return true;
    }

    // not permissioned in so redirect to unauthorized page with the return url
    this.router.navigate(['/error/401'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}