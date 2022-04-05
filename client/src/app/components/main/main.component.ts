import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
    cards: any[] = [
        {
            _id: '63c8f9c8f9c8f9c8f9c67scad',
            name: 'Debit card',
            amount: 10000.50,
            currency: '$',
            disabled: false,
        },
        {
            _id: '5e9f9c8f9c8f9c8f9c8f9c8f',
            name: 'Карта для покупок',
            amount: 1000.23,
            currency: '₽',
            disabled: true,
        }
    ]
    constructor(private router: Router) { }

    ngOnInit(): void {
        this.router.navigate(['/home', this.cards[0]._id]);
    }
}
