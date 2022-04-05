import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.sass']
})
export class CardsComponent implements OnInit {
    cards: any[] = [
        {
            _id: '63c8f9c8f9c8f9c8f9c67scad',
            name: 'Debit card',
            amount: 10000.50,
            currency: '$',
            disabled: false,
        },
        {
            _id: '5e9f9c8f9c8f9c8f9c8f9c8f2',
            name: 'Карта для покупок',
            amount: 1000.23,
            currency: '₽',
            disabled: true,
        }
    ]
    constructor() { }

    ngOnInit(): void {

    }
}
