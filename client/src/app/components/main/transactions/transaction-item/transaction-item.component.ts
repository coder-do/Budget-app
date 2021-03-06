import { IAccount } from './../../../../shared/interfaces/account';
import { MatDrawer } from '@angular/material/sidenav';
import { ITransaction } from '../../../../shared/interfaces/account';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.sass']
})
export class TransactionItemComponent implements OnInit {
    @Input() transaction!: ITransaction;
    @Input() account!: IAccount;
    @Input() currency!: string;
    category: string = '';

    constructor() { }

    ngOnInit(): void {
        this.category = this.transaction.category[0].split(/\/| /)[0];
    }

    onClick(drawer: MatDrawer): void {
        drawer.toggle();
    }
}
