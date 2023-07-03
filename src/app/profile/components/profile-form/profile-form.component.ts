import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'app/profile/models/profile';
import { ApiService } from 'core/services/api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.less'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
    public email = '';

    public profileForm!: FormGroup;

    public profile!: Profile;

    private subscription: Subscription | null = null;

    constructor(private fb: FormBuilder, private apiService: ApiService) {}

    ngOnInit(): void {
        this.apiService.getProfile$.subscribe((profile) => {
            this.profile = profile;
            this.initForm();
        });
    }

    private initForm() {
        this.profileForm = this.fb.group({
            email: { value: this.profile.email, disabled: true },
            firstName: [this.profile.firstName, [Validators.required, Validators.maxLength(255)]],
            lastName: [this.profile.lastName, [Validators.required, Validators.maxLength(255)]],
            phone: [
                this.profile.phone,
                [
                    Validators.required,
                    Validators.pattern(/\p{N}+/u),
                    Validators.maxLength(10),
                    Validators.minLength(10),
                ],
            ],
            website: [
                this.profile.website,
                [
                    Validators.required,
                    Validators.pattern(
                        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/gm
                    ),
                ],
            ],
        });
    }

    get firstName() {
        return this.profileForm.get('firstName');
    }

    get lastName() {
        return this.profileForm.get('lastName');
    }

    get phone() {
        return this.profileForm.get('phone');
    }

    get website() {
        return this.profileForm.get('website');
    }

    public saveProfile() {
        const updateProfile = {
            firstName: this.firstName?.value,
            lastName: this.lastName?.value,
            phone: this.phone?.value,
            website: this.website?.value,
        };

        this.apiService.updateProfile(updateProfile).subscribe();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
