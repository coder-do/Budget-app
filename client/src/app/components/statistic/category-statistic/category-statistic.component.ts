import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IAccount, ITransaction } from 'src/app/shared/interfaces/account';

type TransFormedData = {
    category: string,
    amount: number,
    percent: number
};

@Component({
    selector: 'app-category-statistic',
    templateUrl: './category-statistic.component.html',
    styleUrls: ['./category-statistic.component.sass']
})
export class CategoryStatisticComponent implements OnInit, OnChanges, OnDestroy {
    @Input() account!: IAccount;
    updatedAccount!: ITransaction[];
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });
    sum: number = 0;
    transactions!: TransFormedData[];
    allCategories!: string[];
    displayedColumns: string[] = ['category', 'amount', 'percent'];
    rangeSub: Subscription = new Subscription();

    constructor() { }

    ngOnInit(): void {
        this.updatedAccount = this.account.transactions.expense;
        this.allCategories = this.getAllCategories();
        this.sum = this.getSum(this.updatedAccount);
        this.transactions = this.transformData(this.updatedAccount);
        this.rangeSub = this.range.valueChanges.subscribe(() => {
            if (this.range.value.start && this.range.value.end) {
                this.filterByDate();
            }
        })
    }

    getAllCategories(): string[] {
        const categories = this.updatedAccount.map((item: ITransaction) => {
            return item.category[0];
        })
        return Array.from(new Set(categories));
    }

    filterByDate(): void {
        const start = new Date(this.range.value.start).getTime();
        const end = new Date(this.range.value.end).getTime();
        this.updatedAccount = this.account.transactions.expense.filter((item: ITransaction) => {
            const date = new Date(item.payment_date).getTime();
            return date >= start && date <= end;
        })
        this.transactions = this.transformData(this.updatedAccount);
        this.sum = this.getSum(this.updatedAccount);
    }

    transformData(data: ITransaction[]): TransFormedData[] {
        let arr: TransFormedData[] = [];
        let sum: number = this.getSum(data);
        this.allCategories.forEach((item: string) => {
            arr.push({
                category: item,
                amount: data.filter((transaction: ITransaction) => {
                    return transaction.category[0] === item;
                }).reduce((acc: number, cur: ITransaction) => {
                    return acc + cur.amount;
                }, 0),
                percent: +((data.filter((transaction: ITransaction) => {
                    return transaction.category[0] === item;
                }).reduce((acc: number, cur: ITransaction) => {
                    return acc + cur.amount;
                }, 0) / sum) * 100).toFixed(2)
            })
        })
        return arr.filter((item: TransFormedData) => item.amount > 0);
    }

    getSum(data: ITransaction[]): number {
        return data.reduce((acc: number, cur: ITransaction) => {
            return acc + cur.amount;
        }, 0);
    }

    ngOnChanges(): void {
        this.updatedAccount = this.account.transactions.expense;
        this.allCategories = this.getAllCategories();
        this.transactions = this.transformData(this.updatedAccount);
        this.sum = this.getSum(this.updatedAccount);
    }

    ngOnDestroy(): void {
        this.rangeSub.unsubscribe();
    }
}
