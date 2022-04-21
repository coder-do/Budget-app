import { TransactionService } from 'src/app/services/transaction.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { Subscription } from 'rxjs';
import { IAccount } from 'src/app/shared/interfaces/account';
import { MatDrawer } from '@angular/material/sidenav';

type MatDialogData = {
    account: IAccount,
    amount: number,
    accountId: string,
    transaction_id: string,
    transaction_type: string,
    drawer: MatDrawer
}

@Component({
    selector: 'app-transaction-modal',
    templateUrl: './transaction-modal.component.html',
    styleUrls: ['./transaction-modal.component.sass']
})
export class TransactionModalComponent implements OnInit, OnDestroy {
    sum: number = 0;
    account!: IAccount;
    accountId!: string;
    paramsSub: Subscription = new Subscription();
    accountsSub: Subscription = new Subscription();
    accountsChangeSub: Subscription = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
        private dialogRef: MatDialogRef<TransactionModalComponent>,
        private transactionService: TransactionService,
        private accountsService: AccountsService) { }

    ngOnInit(): void { }

    onDelete(): void {
        const { drawer, accountId, transaction_id, transaction_type, amount, account } = this.data;
        this.transactionService.deleteTransaction(accountId, transaction_id, transaction_type);
        if (this.sum === 0) {
            if (transaction_type === 'expense') {
                this.sum = account.amount + amount;
            } else {
                this.sum = account.amount - amount;
            }
        }
        this.accountsService.updateAccount({
            _id: accountId,
            amount: this.sum
        }, false);
        drawer.close();
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.sum = 0;
        this.paramsSub.unsubscribe();
        this.accountsSub.unsubscribe();
        this.accountsChangeSub.unsubscribe();
    }
}
