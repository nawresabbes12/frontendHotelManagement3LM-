import { Injectable, Inject } from '@angular/core';
import { AuthService } from './services/auth.service'; // Make sure this path is correct
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getIsAuthenticated().pipe(
      take(1), 
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true; 
        } else {
          this.router.navigate(['/login']); 
          return false; 
        }
      })
    );
  }
  
}
