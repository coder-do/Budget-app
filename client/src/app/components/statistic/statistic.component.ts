import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { IAccount } from 'src/app/shared/interfaces/account';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.sass']
})
export class StatisticComponent implements OnInit, OnDestroy {
    selectedAccount: IAccount | undefined;
    cards: IAccount[] = [];
    activatedCardId!: string;
    loading: boolean = false;
    sub: Subscription = new Subscription();
    paramsSub: Subscription = new Subscription();

    constructor(private accountsService: AccountsService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loading = true;
        this.paramsSub = this.route.params.subscribe((params: Params) => {
            this.activatedCardId = params['accountId'];
            this.getAccounts();
        })
    }

    getAccounts(): void {
        this.accountsService.getAccounts();
        this.sub = this.accountsService.accounts.subscribe((accounts: IAccount[]) => {
            this.loading = false;
            this.cards = accounts;
            this.selectedAccount = accounts.find((account: IAccount) => account._id === this.activatedCardId);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
