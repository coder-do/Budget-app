import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IAccount, ITransaction } from 'src/app/shared/interfaces/account';

type TransFormedData = {
    month: string,
    income: number,
    expense: number,
    economy: number
    percentEconomy: number
};

@Component({
    selector: 'app-monthly-statistic',
    templateUrl: './monthly-statistic.component.html',
    styleUrls: ['./monthly-statistic.component.sass']
})
export class MonthlyStatisticComponent implements OnInit, OnChanges, OnDestroy {
    @Input() account!: IAccount;
    updatedAccount!: ITransaction[];
    range = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });
    sum: number = 0;
    transactions!: TransFormedData[];
    allMonths: string[] = [];
    allCategories!: string[];
    monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    total = {
        income: 0,
        expense: 0,
        economy: 0,
        percentEconomy: 0
    };
    average = {
        income: 0,
        expense: 0,
        economy: 0,
        percentEconomy: 0
    }
    displayedColumns: string[] = ['month', 'income', 'expense', 'economy', 'pEconomy'];
    alternateFooter: string[] = ['itemFooter', 'incomes', 'expenses', 'economys', 'pEconomys'];
    rangeSub: Subscription = new Subscription();

    constructor() { }

    ngOnInit(): void {
        const temp = [...this.account.transactions.income, ...this.account.transactions.expense];
        this.updatedAccount = temp;
        this.allMonths = this.getAllMonths();
        this.transactions = this.transformData(this.updatedAccount);
        this.countTotal();
        this.countAverage();
        this.rangeSub = this.range.valueChanges.subscribe(() => {
            if (this.range.value.start && this.range.value.end) {
                this.allMonths = this.getAllMonths();
                this.transactions = this.transformData(this.updatedAccount);
                this.filterByDate();
                this.countTotal();
                this.countAverage();
            }
        })
    }

    transformData(data: ITransaction[]): TransFormedData[] {
        const result: TransFormedData[] = [];
        for (let i = 0; i < this.allMonths.length; i++) {
            let income = 0, expense = 0, economy = 0, percentEconomy = 0;
            for (let j = 0; j < data.length; j++) {
                const t = `${this.monthNames[new Date(data[j].payment_date).getMonth()]} ${new Date(data[j].payment_date).getFullYear()}`;
                if (t === this.allMonths[i]) {
                    if (data[j].type === 'income') {
                        income += data[j].amount;
                    } else {
                        expense += data[j].amount;
                    }
                }
            }
            economy = income - expense;
            percentEconomy = income > 0 ? +((economy / income) * 100).toFixed(2) : -100;
            result.push({ month: this.allMonths[i], income, expense, economy, percentEconomy });
        }
        return result;
    }

    countTotal(): void {
        this.total.income = 0;
        this.total.expense = 0;
        this.total.economy = 0;
        this.total.percentEconomy = 0;
        for (let i = 0; i < this.transactions.length; i++) {
            this.total.income += this.transactions[i].income;
            this.total.expense += this.transactions[i].expense;
            this.total.economy += this.transactions[i].economy;
            this.total.percentEconomy += this.transactions[i].percentEconomy;
        }
    }

    countAverage(): void {
        this.average.income = 0;
        this.average.expense = 0;
        this.average.economy = 0;
        this.average.percentEconomy = 0;
        this.average.income = this.total.income / this.transactions.length;
        this.average.expense = this.total.expense / this.transactions.length;
        this.average.economy = this.total.economy / this.transactions.length;
        this.average.percentEconomy = this.total.percentEconomy / this.transactions.length;
    }

    getAllMonths(): string[] {
        let months: string[] = [];
        for (let i = 0; i < this.updatedAccount.length; i++) {
            const t = `${this.monthNames[new Date(this.updatedAccount[i].payment_date).getMonth()]} ${new Date(this.updatedAccount[i].payment_date).getFullYear()}`;
            if (!months.includes(t)) {
                months.push(t);
            }
        }
        months = months.sort((a, b) => {
            const aDate = new Date(a);
            const bDate = new Date(b);
            if (aDate.getFullYear() === bDate.getFullYear()) {
                return aDate.getMonth() - bDate.getMonth();
            } else {
                return aDate.getFullYear() - bDate.getFullYear();
            }
        })
        return months;
    }

    filterByDate(): void {
        const start = new Date(this.range.value.start).getTime();
        const end = new Date(this.range.value.end).getTime();
        const temp = [...this.account.transactions.income, ...this.account.transactions.expense];
        this.updatedAccount = temp.filter(t => {
            const tDate = new Date(t.payment_date).getTime();
            return tDate >= start && tDate <= end;
        })
        this.allMonths = this.getAllMonths();
        this.transactions = this.transformData(this.updatedAccount);
    }

    ngOnChanges(): void {
        const temp: ITransaction[] = [...this.account.transactions.income, ...this.account.transactions.expense];
        this.updatedAccount = temp;
        this.allMonths = this.getAllMonths();
        this.transactions = this.transformData(this.updatedAccount);
        this.countTotal();
        this.countAverage();
    }

    ngOnDestroy(): void {
        this.rangeSub.unsubscribe();
    }
}
