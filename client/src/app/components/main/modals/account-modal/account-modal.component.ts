import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { IAccount } from 'src/app/shared/interfaces/account';

type MatDialogData = { accountId: string, drawer: MatDrawer };

@Component({
    selector: 'app-account-modal',
    templateUrl: './account-modal.component.html',
    styleUrls: ['./account-modal.component.sass']
})
export class AccountModalComponent implements OnInit, OnDestroy {
    allAcounts!: IAccount[];
    accountsSub: Subscription = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
        private dialogRef: MatDialogRef<AccountModalComponent>,
        private accountsService: AccountsService,
        private router: Router) { }

    ngOnInit(): void {
        this.accountsService.getAccounts();
        this.accountsSub = this.accountsService.accounts.subscribe((accounts: IAccount[]) => {
            this.allAcounts = accounts;
        })
    }

    onDelete(): void {
        const { accountId, drawer } = this.data;
        this.accountsService.deleteAccount(accountId);
        this.allAcounts = this.allAcounts.filter(account => account._id !== accountId);
        if (this.allAcounts.length === 0) {
            this.router.navigate(['/home']);
        } else {
            this.router.navigate(['/home/' + this.allAcounts[0]._id]);
        }
        this.dialogRef.close();
        drawer.close();
    }

    ngOnDestroy(): void {
        this.accountsSub.unsubscribe();
    }
}
