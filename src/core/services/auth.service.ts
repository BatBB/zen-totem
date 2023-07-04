import { Injectable } from '@angular/core';
import { AuthData, Roles } from 'app/profile/models/profile';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuth$$ = new BehaviorSubject<boolean>(false);

    private userRole$$ = new BehaviorSubject<Roles | null>(null);

    constructor() {
        const authData = localStorage.getItem('authData') as AuthData | null;
        const userRole = localStorage.getItem('userRole') as Roles | null;

        if (authData && userRole) {
            this.isAuth$$.next(true);
            this.userRole$$.next(userRole);
        }
    }

    get isAuth$() {
        return this.isAuth$$.asObservable();
    }

    public login(authData: AuthData) {
        if (authData.login !== 'login' || authData.password !== 'password') {
            return of(false);
        }

        this.isAuth$$.next(true);

        const userRole = this.getRole();

        this.userRole$$.next(userRole);

        localStorage.setItem('authData', JSON.stringify(authData));
        localStorage.setItem('userRole', userRole);
        return of(true);
    }

    public logout() {
        this.isAuth$$.next(false);
        this.userRole$$.next(null);
        localStorage.removeItem('authData');
        localStorage.removeItem('userRole');
    }

    private getRole(): Roles {
        return Math.random() > 0.5 ? 'admin' : 'user';
    }
}
