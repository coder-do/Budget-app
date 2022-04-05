import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

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
    hide = true;
    error: string = '';

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    onSubmit() {
        const { email, password } = this.loginForm.value;
        console.log(email, password);
        this.authService.login(email, password)
            .subscribe(
                {
                    next: (res) => {
                        if (res.status === 200) {
                            this.router.navigate(['/home']);
                        }
                    },
                    error: (err) => {
                        this.error = err.error.message;
                        console.log(this.error);
                    }
                }
            );
    }
}
