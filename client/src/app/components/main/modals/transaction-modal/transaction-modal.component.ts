import { ActivatedRoute, Params } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { Subscription } from 'rxjs';
import { IAccount } from 'src/app/shared/interfaces/account';

@Component({
    selector: 'app-transaction-modal',
    templateUrl: './transaction-modal.component.html',
    styleUrls: ['./transaction-modal.component.sass']
})
export class TransactionModalComponent implements OnInit, OnDestroy {
    sum: number = 0;
    account!: any;
    accountId!: string;
    paramsSub: Subscription = new Subscription();
    accountsSub: Subscription = new Subscription();
    accountsChangeSub: Subscription = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<TransactionModalComponent>,
        private transactionService: TransactionService,
        private accountsService: AccountsService) { }

    ngOnInit(): void {

    }

    onDelete(): void {
        const { drawer, accountId, transaction_id, transaction_type, amount, account } = this.data;
        console.log(accountId);
        console.log(amount);
        console.log(account.amount);
        console.log(transaction_id);
        console.log(transaction_type);
        this.transactionService.deleteTransaction(accountId, transaction_id, transaction_type);
        if (this.sum === 0) {
            if (transaction_type === 'expense') {
                this.sum = account.amount + amount;
            } else {
                this.sum = account.amount - amount;
            }
        }
        console.log(this.sum);
        this.accountsService.updateAccount({
            _id: accountId,
            amount: this.sum
        });
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
