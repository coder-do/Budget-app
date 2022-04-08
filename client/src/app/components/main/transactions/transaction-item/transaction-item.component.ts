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
    @Input() currency!: string;

    constructor(private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {

    }

    onClick(drawer: MatDrawer): void {
        drawer.toggle();
    }
}
