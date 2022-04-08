import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent {
    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
    hide: boolean = true;
    error: string = '';

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    onSubmit(): void {
        const { email, password } = this.loginForm.value;
        this.authService.login(email, password)
            .subscribe(
                {
                    next: (res: HttpResponseBase) => {
                        if (res.status === 200) {
                            this.router.navigate(['/home']);
                        }
                    },
                    error: (err: HttpErrorResponse) => {
                        this.error = err.error.message;
                    }
                }
            );
    }
}
