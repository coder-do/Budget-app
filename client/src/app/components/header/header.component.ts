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
    user: string | undefined;
    isAdmin: boolean = false;
    url: string = '';
    accountsSub: Subscription = new Subscription();
    paramsSub: Subscription = new Subscription();

    constructor(private accountsService: AccountsService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.user = localStorage.getItem('userName') as string;
        this.isAdmin = localStorage.getItem('role') === 'admin';
        this.accountsService.getAccounts();
        this.paramsSub = this.route.params.subscribe((params: Params) => {
            this.url = params['accountId'];
        });
        this.accountsSub = this.accountsService.accounts.subscribe((accounts: IAccount[]) => {
            if (this.url === '') {
                this.url = accounts[0]._id;
            }
        });
    }

    onClickProfile(): void {
        this.router.navigate(['/profile/' + this.url]);
    }

    onLogout(): void {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.accountsSub.unsubscribe();
        this.paramsSub.unsubscribe();
    }
}
