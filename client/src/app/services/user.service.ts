import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../shared/interfaces/auth';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    id = localStorage.getItem('userId') as string;
    token = localStorage.getItem('token') as string;
    role = localStorage.getItem('role') as string;
    userName = localStorage.getItem('userName') as string;
    expiresIn = localStorage.getItem('expiresIn') as string;

    constructor(private http: HttpClient) { }

    getUser(id: string): Observable<UserData> {
        return this.http.get<UserData>(`${environment.API_URL}/users/${id}`);
    }
}
