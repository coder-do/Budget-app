import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { AuthService } from '../../services/auth.service';
import { IAccount } from '../../shared/interfaces/account';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {
    accounts!: IAccount[];
    user: string | undefined;
    isAdmin: boolean = false;
    isDisabled: boolean = false;
    url: string = '';
    accountsSub: Subscription = new Subscription();
    paramsSub: Subscription = new Subscription();

    constructor(private accountsService: AccountsService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        this.user = localStorage.getItem('userName') as string;
        this.isAdmin = localStorage.getItem('role') === 'admin';
        this.accountsService.getAccounts();
        this.paramsSub = this.route.params.subscribe((params: Params) => {
            this.url = params['accountId'];
        });
        this.accountsSub = this.accountsService.accounts.subscribe((accounts: IAccount[]) => {
            this.accounts = accounts;
            if (accounts.length === 0) {
                this.isDisabled = true;
            }
            if (this.url === '') {
                this.url = accounts[0]._id;
            }
        });
    }

    onLogout(): void {
        this.authService.logout();
    }

    onAccounts(): void {
        this.router.navigate(['/home/' + this.accounts[0]._id]);
    }

    ngOnDestroy(): void {
        this.accountsSub.unsubscribe();
        this.paramsSub.unsubscribe();
    }
}
