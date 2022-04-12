import { environment } from 'src/environments/environment';
import { IAccount } from '../shared/interfaces/account';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    transactionsChanged: Subject<IAccount[] | string> = new Subject();

    constructor(private http: HttpClient,
        private notificationService: NotificationService) { }

    addTransaction(accountId: string, transaction: any, type: string): void {
        this.http.post(`${environment.API_URL}/${type}s/add/${accountId}`, transaction)
            .subscribe(() => {
                this.transactionsChanged.next('add');
                this.notificationService.notification.next('Transaction was successfully added!');
            })
    }

    updateTransaction(accountId: string, transaction: any, type: string): void {
        this.http.put(`${environment.API_URL}/${type}s/${type}/${accountId}/${transaction._id}`, transaction)
            .subscribe(() => {
                this.transactionsChanged.next('update');
                this.notificationService.notification.next('Transaction was successfully updated!');
            })
    }

    deleteTransaction(accountId: string, id: string, type: string): void {
        this.http.delete(`${environment.API_URL}/${type}s/${type}/${accountId}/${id}`)
            .subscribe(() => {
                this.transactionsChanged.next('delete');
                this.notificationService.notification.next('Transaction was successfully removed!');
            })
    }
}
