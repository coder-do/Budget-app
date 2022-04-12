import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { IAccount } from 'src/app/shared/interfaces/account';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit, OnDestroy {
    cards: IAccount[] = [];
    loading: boolean = false;
    activatedCardId: string = '';
    sub: Subscription = new Subscription();
    paramsSub: Subscription = new Subscription();

    constructor(private accountsService: AccountsService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loading = true;
        this.accountsService.getAccounts();
        this.sub = this.accountsService.accounts.subscribe((accounts: IAccount[]) => {
            this.loading = false;
            this.cards = accounts;
        });
        this.paramsSub = this.route.params.subscribe(params => {
            this.activatedCardId = params['accountId'];
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.paramsSub.unsubscribe();
    }
}
