import { Injectable } from '@angular/core';
import { Profile } from 'app/profile/models/profile';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private profile: Profile = {
        email: 'mock@mail.com',
        firstName: 'Firstname',
        lastName: 'Lastname',
        phone: 1234567890,
        website: 'qwerty.com',
    };

    private profile$$ = new BehaviorSubject<Profile>(this.profile);

    private profileUpdateSuccess$$ = new BehaviorSubject<null | boolean>(null);

    get getProfile$(): Observable<Profile> {
        return this.profile$$.asObservable();
    }

    public updateProfile(newProfile: Omit<Profile, 'email'>) {
        return new Observable((observer) => {
            setTimeout(() => {
                if (newProfile.firstName.length === 1) {
                    this.profileUpdateSuccess$$.next(false);
                    observer.error('API error!!!');
                } else {
                    this.profile = { ...this.profile, ...newProfile };
                    this.profile$$.next(this.profile);
                    this.profileUpdateSuccess$$.next(true);
                    observer.next();
                    observer.complete();
                }
            }, 500);
        });
    }

    get getProfileUpdateStatus$() {
        return this.profileUpdateSuccess$$.asObservable();
    }
}
