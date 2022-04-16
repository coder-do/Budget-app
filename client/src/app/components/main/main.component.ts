import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAccount } from 'src/app/shared/interfaces/account';
import { AccountsService } from '../../services/accounts.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    loading = false;
    cards: IAccount[] = [];
    sub: Subscription = new Subscription();
    accountsSub: Subscription = new Subscription();

    constructor(private router: Router,
        private accountsService: AccountsService) { }

    ngOnInit(): void {
        this.loading = true;
        this.getAccounts();
        this.accountsSub = this.accountsService.accountsChanged.subscribe(() => {
            this.accountsService.getAccounts();
            this.getAccounts();
        });
        this.loading = false;
    }

    getAccounts(): void {
        this.sub = this.accountsService.accounts.subscribe((accounts: IAccount[]) => {
            this.loading = false;
            if (accounts.length > 0) {
                this.cards = accounts;

                // when we get the accounts, we navigate to the first one by default
                if (this.router.url === '/home' && this.router.url !== `/home/${this.cards[0]._id}`) {
                    this.router.navigate(['/home', this.cards[0]._id]);
                }
            }
        });
    }

    close(): void {
        this.sidenav.close();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.accountsSub.unsubscribe();
    }
}