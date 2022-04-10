import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/categories';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit, OnDestroy {
    searchText: string = '';
    loading: boolean = false;
    incomes!: string[];
    expenses!: string[];
    sortedIncomes!: string[];
    sortedExpenses!: string[];
    allCategories!: ICategory;
    categoriesSub: Subscription = new Subscription();
    sortCategriesSub: Subscription = new Subscription();
    categoriesChangeSub: Subscription = new Subscription();

    constructor(private accountsService: AccountsService,
        private categoriesService: CategoriesService) { }

    ngOnInit(): void {
        this.loading = true;
        this.getCategories();
        this.categoriesChangeSub = this.categoriesService.categoriesChanged.subscribe(() => {
            this.getCategories();
        })
    }

    getCategories(): void {
        this.categoriesSub = this.categoriesService.getCategories().subscribe((categories: any[]) => {
            this.loading = false;
            this.allCategories = categories[0];
            this.incomes = [...categories[0].income];
            this.expenses = [...categories[0].expense];
            this.onSort(this.searchText);;
            this.sortCategriesSub = this.categoriesService.sortByCategoriesType.subscribe((type: string) => {
                if (type === 'income') {
                    this.sortedIncomes = this.incomes.slice();
                    this.sortedExpenses = [];
                } else if (type === 'expense') {
                    this.sortedIncomes = [];
                    this.sortedExpenses = this.expenses.slice();
                } else {
                    this.sortedIncomes = this.incomes.slice();
                    this.sortedExpenses = this.expenses.slice();
                }
            })
        });
    }

    onSort(text: string): void {
        this.sortedIncomes = this.incomes.slice().filter((item: string) => item.toLowerCase().includes(text));
        this.sortedExpenses = this.expenses.slice().filter((item: string) => item.toLowerCase().includes(text));
    }

    clearText(): void {
        this.searchText = '';
        this.onSort(this.searchText);
    }

    ngOnDestroy(): void {
        this.categoriesSub.unsubscribe();
        this.sortCategriesSub.unsubscribe();
        this.categoriesChangeSub.unsubscribe();
    }
}
