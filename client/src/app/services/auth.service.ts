import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserData } from '../shared/interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: UserData | undefined;

    constructor(private http: HttpClient,
        private router: Router) { }


    login(email: string, password: string): Observable<HttpResponse<Object> | HttpResponse<Response>> {
        return this.http
            .post(`${environment.API_URL}/auth/login`, { email, password }, { observe: 'response' })
            .pipe(tap((res) => this.setSession(res)));
    }

    isLoggedIn(): boolean {
        const expiresIn = localStorage.getItem('expiresIn');
        if (expiresIn) {
            if (Date.now() > Number(expiresIn)) {
                this.logout();
                return false;
            }
            return true;
        }
        return false;
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    private setSession(res: any): void {
        const expiresIn = Date.now() + Number(res.body.session.cookie.expires);
        localStorage.setItem('token', res.body.session.token);
        localStorage.setItem('userId', res.body.data._id);
        localStorage.setItem('role', res.body.data.role);
        localStorage.setItem('userName', `${res.body.data.firstName} ${res.body.data.lastName}`);
        localStorage.setItem('expiresIn', String(expiresIn));
    }
}
