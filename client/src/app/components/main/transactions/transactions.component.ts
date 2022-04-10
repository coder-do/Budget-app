import { ActivatedRoute, Params } from '@angular/router';
import { AccountsService } from '../../../services/accounts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAccount, ITransaction } from '../../../shared/interfaces/account';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../../services/transaction.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit, OnDestroy {
    id: string = '';
    currency: string = '';
    value: string = '';
    searchText: string = '';
    sortBy: string = '';
    loading: boolean = false;
    accountTemp: any;
    account: ITransaction[] = [];
    paramSub: Subscription = new Subscription();
    timeout!: ReturnType<typeof setTimeout>;
    accountSub: Subscription = new Subscription();
    sortSub: Subscription = new Subscription();
    transactionsChangedSub: Subscription = new Subscription();

    constructor(private route: ActivatedRoute,
        private accountsService: AccountsService,
        private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.loading = true;
        this.paramSub = this.route.params.subscribe((params: Params) => {
            const id: string = params['accountId'];
            if (id) {
                this.id = id;
                this.getTransactions();
            }
        });
        this.sortSub = this.accountsService.sortByTransactionType.subscribe((value: string) => {
            this.sortBy = value;
        });
        this.transactionsChangedSub = this.transactionService.transactionsChanged.subscribe(() => {
            if (this.id) {
                this.getTransactions();
            }
        })
        this.timeout = setTimeout(() => {
            this.loading = false;
        }, 1700);
    }

    getTransactions(): void {
        this.accountSub = this.accountsService.getAccount(this.id).subscribe((account: IAccount[]) => {
            this.accountTemp = account[0];
            const transformed = [...account[0].transactions.income, ...account[0].transactions.expense];
            this.currency = account[0].currency.split(' ')[1];
            this.account = transformed;
            this.onSort('desc');
        });
    }

    onSort(value: unknown) {
        this.account.sort((a: ITransaction, b: ITransaction): number => {
            if (value === 'desc') {
                return new Date(b.payment_date).valueOf() - new Date(a.payment_date).valueOf();
            }
            return new Date(a.payment_date).valueOf() - new Date(b.payment_date).valueOf();
        });
    }

    ngOnDestroy(): void {
        this.paramSub.unsubscribe();
        this.accountSub.unsubscribe();
        this.sortSub.unsubscribe();
        this.transactionsChangedSub.unsubscribe();
        clearTimeout(this.timeout);
    }
}