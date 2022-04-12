import { Subject } from 'rxjs';
import { Component, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-transactions-sort',
    templateUrl: './transactions-sort.component.html',
    styleUrls: ['./transactions-sort.component.sass']
})
export class TransactionsSortComponent implements OnInit {
    @Output() sort: Subject<string> = new Subject<string>();
    icon: string = 'arrow_downward';

    constructor() { }

    ngOnInit(): void {

    }

    toggleIcon(): void {
        this.icon = this.icon === 'arrow_downward' ? 'arrow_upward' : 'arrow_downward';
        this.icon === 'arrow_downward' ? this.sort.next('desc') : this.sort.next('asc');
    }
}
