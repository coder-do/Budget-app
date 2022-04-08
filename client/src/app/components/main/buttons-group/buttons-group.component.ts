import { IAccount } from 'src/app/shared/interfaces/account';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AccountsService } from '../../../services/accounts.service';
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
    selected: BehaviorSubject<string> = new BehaviorSubject<string>('');
    selectedValue!: string;
    selectedSub: Subscription = new Subscription();

    constructor(private route: ActivatedRoute,
        private accountsService: AccountsService) { }

    ngOnInit(): void {
        this.selectedSub = this.selected.subscribe((value: string) => {
            this.selectedValue = value;
            this.accountsService.sortByTransactionType.next(value);
        });
        this.route.params.subscribe((params) => {
            const id = params['accountId'];
            this.id = id;
            id && this.accountsService.getAccount(id).subscribe((account: IAccount[]) => {
                this.currency = account[0].currency;
            })
        });
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

    ngOnDestroy(): void {
        this.selectedSub.unsubscribe();
    }
}
