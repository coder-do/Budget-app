import { environment } from '../../environments/environment';
import { IFAQ } from '../shared/interfaces/faq';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FaqService {

    constructor(private http: HttpClient) { }

    getFaqs(): Observable<IFAQ[]> {
        return this.http.get<IFAQ[]>(`${environment.API_URL}/faq/questions`);
    }
}
