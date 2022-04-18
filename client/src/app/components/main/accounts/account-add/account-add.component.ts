import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { currency_list } from 'src/app/shared/currency-list';
import { IDropDownList } from 'src/app/shared/interfaces/currencies';
import { v4 as uuid } from 'uuid';
import { AccountsService } from '../../../../services/accounts.service';

@Component({
    selector: 'app-account-add',
    templateUrl: './account-add.component.html',
    styleUrls: ['./account-add.component.sass']
})
export class AccountAddComponent implements OnInit {
    @Input() drawer!: MatDrawer;
    currencies: IDropDownList[] = currency_list;
    addForm: FormGroup = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
        currency: [currency_list[0], [Validators.required]],
        description: ['', [Validators.maxLength(256)]],
    });
    userId: string = localStorage.getItem('userId') as string;
    userSub: Subscription = new Subscription();

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        private accountsService: AccountsService) { }

    ngOnInit(): void {
        this.userSub = this.userService.getUser(this.userId).subscribe(user => {
            this.currencies.forEach(currency => {
                if (currency.country === user.country) {
                    this.addForm.controls['currency'].setValue(currency);
                }
            })
        })
    }

    onSubmit(): void {
        const { title, currency, description } = this.addForm.value;
        const finalData = {
            _id: uuid(),
            userId: this.userId,
            title,
            description,
            currency: `${currency.code} ${currency.symbol}`,
            amount: 0,
            transactions: {
                income: [],
                expense: []
            }
        }
        this.accountsService.addAccount(finalData);
        this.clearForm();
        this.clearFormErrors();
        this.drawer.close();
    }

    clearForm(): void {
        this.addForm.controls['title'].setValue('');
        this.addForm.controls['description'].setValue('');
    }

    clearFormErrors(): void {
        for (let name in this.addForm.controls) {
            this.addForm.controls[name].setErrors(null);
        }
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}
