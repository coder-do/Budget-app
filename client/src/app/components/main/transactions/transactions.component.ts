import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit {
    value: string = '';
    transactions: any[] = [
        {
            _id: "1",
            title: "Dinner with Sara",
            category: ["Home", "Rent"],
            description: "Payment for flat in Samrockastreet 25. Don't forget to send a receipt.",
            amount: 650,
            payee: "John Smith",
            payment_date: new Date(2020, 2, 2),
            type: "expenses",
            createdAt: "ddd",
            updatedAt: "ddd"
        },
        {
            _id: "2",
            title: "Salary for February",
            category: ["Salary"],
            description: "Salary for February",
            amount: 5120,
            payee: "John Smith",
            payment_date: new Date(2022, 1, 4),
            type: "income",
            createdAt: "now",
            updatedAt: "tommorow"
        },
        {
            _id: "3",
            title: "Salary for January",
            category: ["Salary", "Taxes"],
            description: "Salary for January",
            amount: 5120,
            payee: "John Smith",
            payment_date: new Date(2022, 7, 11),
            type: "income",
            createdAt: "now",
            updatedAt: "tommorow"
        },
        {
            _id: "4",
            title: "Shopping in Zara & H&M",
            category: ["Shopping", "Clothes", "Shoes"],
            description: "Shopping in Zara & H&M",
            amount: 650,
            payee: "John Smith",
            payment_date: new Date(2021, 2, 26),
            type: "expenses",
            createdAt: "ddd",
            updatedAt: "ddd"
        },
    ];
    constructor() { }

    ngOnInit(): void {
    }
}
