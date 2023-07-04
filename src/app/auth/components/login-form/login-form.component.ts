import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'core/services';
import { take } from 'rxjs';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.less'],
})
export class LoginFormComponent {
    public loginForm = this.fb.group({
        login: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    public login() {
        this.authService
            .login({
                login: this.loginForm.get('login')?.value || '',
                password: this.loginForm.get('password')?.value || '',
            })
            .pipe(take(1))
            .subscribe((isSuccessAuth) => {
                if (isSuccessAuth) {
                    this.router.navigate(['home']);
                }
            });
    }
}
