import { IAccount } from 'src/app/shared/interfaces/account';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AccountsService } from '../../../services/accounts.service';
import { CategoriesService } from '../../../services/categories.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-buttons-group',
    templateUrl: './buttons-group.component.html',
    styleUrls: ['./buttons-group.component.sass']
})
export class ButtonsGroupComponent implements OnInit, OnDestroy {
    id!: string;
    currency!: string;
    selectedValue!: string;
    disableBtns: boolean = false;
    selected: BehaviorSubject<string> = new BehaviorSubject<string>('');
    selectedSub: Subscription = new Subscription();

    constructor(private route: ActivatedRoute,
        private router: Router,
        private accountsService: AccountsService,
        private categoriesService: CategoriesService) { }

    ngOnInit(): void {
        this.selectedSub = this.selected.subscribe((value: string) => {
            this.selectedValue = value;
            this.accountsService.sortByTransactionType.next(value);
            this.categoriesService.sortByCategoriesType.next(value);
        });
        this.route.params.subscribe((params) => {
            const id = params['accountId'];
            this.id = id;
            id && this.accountsService.getAccount(id).subscribe((account: IAccount[]) => {
                this.currency = account[0].currency;
            })
            this.checkForDisable();
        });
        this.checkForDisable();
    }

    checkForDisable(): void {
        if (this.router.url.includes('/categories')) {
            this.disableBtns = true;
        } else {
            this.disableBtns = false;
        }
    }

    onSelect(value: string) {
        if (this.selectedValue === value) {
            this.selected.next('');
        } else {
            this.selected.next(value);
        }
    }

    onAddTransaction(drawer: MatDrawer): void {
        this.id && drawer.toggle();
    }

    onAddAccount(drawer: MatDrawer): void {
        drawer.toggle();
    }

    onAddCategory(drawer: MatDrawer): void {
        drawer.toggle();
    }

    ngOnDestroy(): void {
        this.selectedSub.unsubscribe();
    }
}
