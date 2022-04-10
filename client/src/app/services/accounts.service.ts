import { NotificationService } from './notification.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from '../shared/interfaces/account';
import { environment } from 'src/environments/environment';
import { TransactionService } from './transaction.service';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    accounts: Subject<IAccount[]> = new Subject<IAccount[]>();
    accountsChanged: Subject<IAccount[] | string> = new Subject();
    sortByTransactionType: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private http: HttpClient,
        private notificationService: NotificationService,
        private transactionService: TransactionService) { }

    getAccounts(): void {
        this.http.get<IAccount[]>(`${environment.API_URL}/accounts/all`)
            .subscribe((accounts: IAccount[]) => {
                this.accounts.next(accounts);
            });
    }

    getAccount(id: string): Observable<IAccount[]> {
        return this.http.get<IAccount[]>(`${environment.API_URL}/accounts/${id}`);
    }

    addAccount(account: any): void {
        this.http.post(`${environment.API_URL}/accounts`, account)
            .subscribe(() => {
                this.accountsChanged.next('add');
                this.notificationService.notification.next('Account was successfully added!');
            });
    }

    updateAccount(account: any): void {
        this.http.put(`${environment.API_URL}/accounts/account/${account._id}`, account)
            .subscribe(() => {
                this.accountsChanged.next('update');
                this.transactionService.transactionsChanged.next('update');
                this.notificationService.notification.next('Account was successfully updated!');
            });
    }

    deleteAccount(id: string): void {
        this.http.delete(`${environment.API_URL}/accounts/account/${id}`)
            .subscribe(() => {
                this.accountsChanged.next('delete');
                this.transactionService.transactionsChanged.next('update');
                this.notificationService.notification.next('Account was successfully deleted!');
            });
    }
}
