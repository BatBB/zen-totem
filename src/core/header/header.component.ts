import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'app/profile/models/profile';
import { AuthService } from 'core/services';
import { ApiService } from 'core/services/api.service';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    public profile!: Profile;

    public successStatus: boolean | null = null;

    public successMessage = 'Profile updated';

    public errorMessage = 'Update error';

    private subscriptionTimer: Subscription | null = null;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.apiService.getProfile$.subscribe((profile) => {
            this.profile = profile;
        });

        this.apiService.getProfileUpdateStatus$.subscribe((status) => {
            this.successStatus = status;

            if (this.successStatus) {
                this.subscriptionTimer = timer(3000).subscribe(() => {
                    this.successStatus = null;
                });
            }
        });
    }

    public closeStatus() {
        this.successStatus = null;
    }

    public logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    ngOnDestroy(): void {
        if (this.subscriptionTimer) {
            this.subscriptionTimer.unsubscribe();
        }
    }
}
