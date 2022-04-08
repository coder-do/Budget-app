import { TransactionService } from 'src/app/services/transaction.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-transaction-modal',
    templateUrl: './transaction-modal.component.html',
    styleUrls: ['./transaction-modal.component.sass']
})
export class TransactionModalComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<TransactionModalComponent>,
        private transactionService: TransactionService) { }

    ngOnInit(): void {

    }

    onDelete(): void {
        const { accountId, transaction_id, transaction_type, drawer } = this.data;
        this.transactionService.deleteTransaction(accountId, transaction_id, transaction_type);
        drawer.close();
        this.dialogRef.close();
    }
}
