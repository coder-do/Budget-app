import { IAccount } from '../../../shared/interfaces/account';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.sass']
})
export class CardsComponent implements OnInit {
    @Input() cards: IAccount[] = [];
    @Input() activated!: string;

    constructor() { }

    ngOnInit(): void {

    }
}
