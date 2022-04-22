import { ActivatedRoute, Params } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { IDropDownList } from '../../../../shared/interfaces/currencies';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';
import { currency_list } from '../../../../shared/currency-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TransactionService } from 'src/app/services/transaction.service';
import { IAccount } from 'src/app/shared/interfaces/account';
import { UserData } from 'src/app/shared/interfaces/auth';

@Component({
    selector: 'app-transaction-add',
    templateUrl: './transaction-add.component.html',
    styleUrls: ['./transaction-add.component.sass']
})
export class TransactionAddComponent implements OnInit, OnDestroy {
    @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
    @Input() drawer!: MatDrawer;
    @Input() currency!: string;
    currencies: IDropDownList[] = currency_list;
    account!: IAccount;
    allCategories!: string[];
    selectedCategories: string[] = [];
    addForm: FormGroup = this.formBuilder.group({
        type: ['expense', Validators.required],
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
        amount: [0, [Validators.required, Validators.min(1)]],
        payment_date: [new Date(), [Validators.required]],
        categories: [''],
        payee: [''],
        description: ['', [Validators.maxLength(256)]],
    });
    sum: number = 0;
    accountId!: string;
    userId: string = localStorage.getItem('userId') as string;
    userSub: Subscription = new Subscription();
    typeSub: Subscription = new Subscription();
    paramsSub: Subscription = new Subscription();
    accountsSub: Subscription = new Subscription();
    accountsChangeSub: Subscription = new Subscription();

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private accountsService: AccountsService,
        private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.userSub = this.userService.getUser(this.userId).subscribe((user: UserData | any) => {
            this.currencies.forEach(currency => {
                if (currency.country === user.country) {
                    this.addForm.controls['categories'].setValue(currency);
                }
            })
            this.allCategories = user.categories[0].expense;
            this.typeSub = this.addForm.controls['type'].valueChanges.subscribe((type: string) => {
                this.allCategories = user.categories[0][type];
                this.selectedCategories = [];
            });
        });
        this.paramsSub = this.route.params.subscribe((params: Params) => {
            this.accountId = params['accountId'];
            this.getAccount();
        });
        this.getAccount();
        this.accountsChangeSub = this.accountsService.accountsChanged.subscribe(() => {
            this.getAccount();
        });
    }

    getAccount() {
        this.accountsSub = this.accountsService.getAccount(this.accountId).subscribe((account: IAccount[]) => {
            this.account = account[0];
        })
    }

    remove(fruit: string): void {
        const index = this.selectedCategories.indexOf(fruit);

        if (index >= 0) {
            this.selectedCategories.splice(index, 1);
            this.allCategories.push(fruit);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if (this.selectedCategories.indexOf(event.option.viewValue) === -1) {
            this.selectedCategories.push(event.option.viewValue);
            this.allCategories.splice(this.allCategories.indexOf(event.option.viewValue), 1);
        }
        this.fruitInput.nativeElement.value = '';
        this.addForm.controls['categories'].setValue(null);
    }

    onSubmit(): void {
        const { title, description, type, amount, payee, payment_date } = this.addForm.value;
        const finalData = {
            _id: Date.now().toString(),
            title,
            category: this.selectedCategories,
            amount,
            payment_date: payment_date.toString(),
            description,
            payee,
            type,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        }
        this.transactionService.addTransaction(this.accountId, finalData, type);
        if (this.sum === 0) {
            if (type === 'expense') {
                this.sum = this.account.amount - amount;
            } else {
                this.sum = this.account.amount + amount;
            }
        }
        this.accountsService.updateAccount({
            _id: this.accountId,
            amount: this.sum
        }, false);
        this.sum = 0;
        this.clearForm();
        this.clearFormErrors();
        this.selectedCategories = [];
        this.drawer.close();
    }

    clearForm(): void {
        this.sum = 0;
        this.addForm.controls['title'].setValue('');
        this.addForm.controls['payee'].setValue('');
        this.addForm.controls['amount'].setValue('');
        this.addForm.controls['description'].setValue('');
        this.addForm.controls['payment_date'].setValue(new Date());
        this.allCategories.push(...this.selectedCategories);
    }

    clearFormErrors(): void {
        for (let name in this.addForm.controls) {
            this.addForm.controls[name].setErrors(null);
        }
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.typeSub.unsubscribe();
        this.paramsSub.unsubscribe();
        this.accountsSub.unsubscribe();
        this.accountsChangeSub.unsubscribe();
    }
}