import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-transactions-sort',
    templateUrl: './transactions-sort.component.html',
    styleUrls: ['./transactions-sort.component.sass']
})
export class TransactionsSortComponent implements OnInit {
    icon: string = 'arrow_downward';
    constructor() { }

    ngOnInit(): void {
    }

    toggleIcon() {
        this.icon = this.icon === 'arrow_downward' ? 'arrow_upward' : 'arrow_downward';
    }
}
