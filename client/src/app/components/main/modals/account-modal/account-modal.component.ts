import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { IAccount } from 'src/app/shared/interfaces/account';

type MatDialogData = { accountId: string, drawer: MatDrawer, cards: IAccount[] };

@Component({
    selector: 'app-account-modal',
    templateUrl: './account-modal.component.html',
    styleUrls: ['./account-modal.component.sass']
})
export class AccountModalComponent implements OnInit {
    @Input() cards!: IAccount[];
    allAcounts!: IAccount[];
    accountsSub: Subscription = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
        private dialogRef: MatDialogRef<AccountModalComponent>,
        private accountsService: AccountsService,
        private router: Router) { }

    ngOnInit(): void { }

    onDelete(): void {
        const { accountId, drawer, cards } = this.data;
        this.accountsService.deleteAccount(accountId);
        const temp = cards.filter(account => account._id !== accountId);
        if (temp.length === 0) {
            this.router.navigate(['/home']);
        } else {
            this.router.navigate(['/home/' + temp[0]._id]);
        }
        this.dialogRef.close();
        drawer.close();
    }
}
