import { ICategory } from 'src/app/shared/interfaces/categories';
import { CategoriesService } from 'src/app/services/categories.service';
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

    constructor(private http: HttpClient,
        private categoriesService: CategoriesService) { }

    getUser(id: string): Observable<UserData> {
        return this.http.get<UserData>(`${environment.API_URL}/users/${id}`);
    }

    updateUser(id: string, data: { categories: any }): void {
        this.http.put<{ categories: any }>(`${environment.API_URL}/users/${id}`, data)
            .subscribe(() => {
                this.categoriesService.categoriesChanged.next('change');
            })
    }
}
