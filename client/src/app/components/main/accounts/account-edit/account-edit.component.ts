import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { IDropDownList } from 'src/app/shared/interfaces/currencies';
import { currency_list } from 'src/app/shared/currency-list';
import { IAccount } from 'src/app/shared/interfaces/account';
import { MatDialog } from '@angular/material/dialog';
import { AccountDeleteComponent } from '../../modals/account-delete/account-delete.component';

export type FinalData = { _id: string, title: string, currency: string, description: string };

@Component({
    selector: 'app-account-edit',
    templateUrl: './account-edit.component.html',
    styleUrls: ['./account-edit.component.sass']
})
export class AccountEditComponent implements OnInit {
    @Input() drawer!: MatDrawer;
    @Input() account!: IAccount;
    currencies: IDropDownList[] = currency_list;
    addForm: FormGroup = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
        currency: [currency_list[0], [Validators.required]],
        description: ['', [Validators.maxLength(256)]],
    });
    finalData!: FinalData;
    initialCurrency!: IDropDownList;
    currencyChanged: boolean = false;
    userId: string = localStorage.getItem('userId') as string;

    constructor(private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private accountsService: AccountsService) { }

    ngOnInit(): void {
        this.setFormValues();
    }

    setFormValues(): void {
        this.addForm.controls['title'].setValue(this.account.title);
        this.addForm.controls['description'].setValue(this.account.description);
        for (let currency of this.currencies) {
            if (currency.code === this.account.currency.split(' ')[0]) {
                this.addForm.controls['currency'].setValue(currency);
                this.initialCurrency = currency;
                break;
            }
        }
    }

    checkCurrencyChange(): void {
        const { currency } = this.addForm.value;
        if (currency.symbol !== this.initialCurrency.symbol &&
            currency.code !== this.initialCurrency.code &&
            currency.country !== this.initialCurrency.country) {
            this.currencyChanged = true;
        } else {
            this.currencyChanged = false;
        }
    }

    onSubmit(): void {
        const { title, currency, description } = this.addForm.value;
        const finalData: FinalData = {
            _id: this.account._id,
            title,
            description,
            currency: `${currency.code} ${currency.symbol}`,
        }
        this.checkCurrencyChange();

        if (this.currencyChanged) {
            this.openDialog(finalData);
        } else {
            this.accountsService.updateAccount(finalData);
            this.drawer.close();
            this.clearForm();
        }
    }

    openDialog(data: FinalData) {
        this.dialog.open(AccountDeleteComponent, {
            data: {
                account: data,
                drawer: this.drawer,
                clearForm: this.clearForm.bind(this)
            }
        });
    }

    clearForm(): void {
        this.addForm.controls['title'].setValue('');
        this.addForm.controls['description'].setValue('');
    }
}
