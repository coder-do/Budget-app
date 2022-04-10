import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { NotificationService } from './notification.service';
import { ICategory } from '../shared/interfaces/categories';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    categoriesChanged: Subject<any> = new Subject();
    sortByCategoriesType: Subject<string> = new Subject();

    constructor(private http: HttpClient,
        private notificationService: NotificationService) { }

    getCategories(): Observable<ICategory[]> {
        return this.http.get<ICategory[]>(`${environment.API_URL}/categories`);
    }
}
