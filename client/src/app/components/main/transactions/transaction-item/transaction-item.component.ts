import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.sass']
})
export class TransactionItemComponent implements OnInit {
    @Input() transaction: any;
    constructor() { }

    ngOnInit(): void {
    }
}
