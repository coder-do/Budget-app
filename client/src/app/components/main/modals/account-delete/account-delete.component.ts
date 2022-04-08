import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { AccountsService } from 'src/app/services/accounts.service';
import { FinalData } from '../../accounts/account-edit/account-edit.component';

type MatDialogData = {
    account: FinalData,
    drawer: MatDrawer,
    clearForm: () => void
}

@Component({
    selector: 'app-account-delete',
    templateUrl: './account-delete.component.html',
    styleUrls: ['./account-delete.component.sass']
})
export class AccountDeleteComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
        private dialogRef: MatDialogRef<AccountDeleteComponent>,
        private accountsService: AccountsService) { }

    ngOnInit(): void {

    }

    onDelete(): void {
        const { account, drawer, clearForm } = this.data;
        this.accountsService.updateAccount(account);
        this.dialogRef.close();
        drawer.close();
        clearForm();
    }
}
