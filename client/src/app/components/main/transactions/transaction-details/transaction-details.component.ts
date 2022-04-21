import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ITransaction } from 'src/app/shared/interfaces/account';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionModalComponent } from '../../modals/transaction-modal/transaction-modal.component';
import { IAccount } from 'src/app/shared/interfaces/account';

@Component({
    selector: 'app-transaction-details',
    templateUrl: './transaction-details.component.html',
    styleUrls: ['./transaction-details.component.sass']
})
export class TransactionDetailsComponent implements OnInit, OnDestroy {
    @Input() transaction!: ITransaction;
    @Input() account!: IAccount;
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
        this.dialog.open(TransactionModalComponent, {
            width: '625px',
            height: '238px',
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
