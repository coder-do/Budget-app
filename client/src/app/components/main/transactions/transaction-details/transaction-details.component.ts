import { IAccount } from './../../../../shared/interfaces/account';
import { AccountsService } from '../../../../services/accounts.service';
import { MatDialog } from '@angular/material/dialog';
import { ITransaction } from '../../../../shared/interfaces/account';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionModalComponent } from '../../modals/transaction-modal/transaction-modal.component';
import { TransactionService } from '../../../../services/transaction.service';

@Component({
    selector: 'app-transaction-details',
    templateUrl: './transaction-details.component.html',
    styleUrls: ['./transaction-details.component.sass']
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {
    @Input() transaction!: ITransaction;
    @Input() account!: any;
    @Input() drawer!: MatDrawer;
    @Input() currency!: string;
    accountId!: string;
    paramsSub: Subscription = new Subscription();
    accountsSub: Subscription = new Subscription();
    transactionsSub: Subscription = new Subscription();
    accountsChangeSub: Subscription = new Subscription();

    constructor(private dialog: MatDialog,
        private transactionsService: TransactionService) { }

    ngOnInit(): void {
        this.transactionsSub = this.transactionsService.transactionsChanged.subscribe(() => {
            this.drawer.close();
        })
    }

    onEdit(drawer: MatDrawer): void {
        drawer.toggle();
    }

    openDialog() {
        console.log('account', this.account);
        this.dialog.open(TransactionModalComponent, {
            data: {
                account: this.account,
                accountId: this.account._id,
                amount: this.transaction.amount,
                transaction_id: this.transaction._id,
                transaction_type: this.transaction.type,
                drawer: this.drawer
            }
        });
    }

    onDelete(): void {
        this.openDialog();
    }

    ngOnDestroy(): void {
        this.paramsSub.unsubscribe();
        this.transactionsSub.unsubscribe();
        this.accountsChangeSub.unsubscribe();
    }
}
