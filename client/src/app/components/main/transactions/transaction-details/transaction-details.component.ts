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
    @Input() drawer!: MatDrawer;
    @Input() currency!: string;
    accountId!: string;
    paramsSub: Subscription = new Subscription();

    constructor(private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private transactionsService: TransactionService) { }

    ngOnInit(): void {
        this.paramsSub = this.route.params.subscribe(params => {
            this.accountId = params['accountId'];
        });
        this.transactionsService.transactionsChanged.subscribe(() => {
            this.drawer.close();
        })
    }

    onEdit(drawer: MatDrawer): void {
        drawer.toggle();
    }

    openDialog() {
        this.dialog.open(TransactionModalComponent, {
            data: {
                accountId: this.accountId,
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
    }
}
