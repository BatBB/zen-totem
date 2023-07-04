import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './services';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkAuth();
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkAuth();
    }

    private checkAuth() {
        return this.authService.isAuth$.pipe(
            map((isAuth) => {
                console.log('isAuth', isAuth);

                if (isAuth) {
                    return true;
                }
                this.router.navigate(['login']);
                return false;
            })
        );
    }
}
