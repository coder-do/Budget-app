import { IAccount } from './../../../../shared/interfaces/account';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ITransaction } from '../../../../shared/interfaces/account';
import { AccountsService } from '../../../../services/accounts.service';
import { UserService } from '../../../../services/user.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserData } from 'src/app/shared/interfaces/auth';

@Component({
    selector: 'app-transaction-edit',
    templateUrl: './transaction-edit.component.html',
    styleUrls: ['./transaction-edit.component.sass']
})
export class TransactionEditComponent implements OnInit, OnDestroy {
    @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
    @Input() transaction!: ITransaction;
    @Input() drawer!: MatDrawer;
    @Input() currency!: string;
    selectedCategories: string[] = [];
    account!: IAccount
    allCategories: string[] = [];
    addForm: FormGroup = this.formBuilder.group({
        type: ['expense', Validators.required],
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(128)]],
        amount: ['', [Validators.required, Validators.min(1)]],
        payment_date: [new Date(), [Validators.required]],
        categories: [''],
        payee: [''],
        description: ['', [Validators.maxLength(256)]],
    });
    sum: number = 0;
    userId: string = localStorage.getItem('userId') as string;
    accountId!: string;
    userSub: Subscription = new Subscription();
    paramsSub: Subscription = new Subscription();
    accountsSub: Subscription = new Subscription();
    accountsChangeSub: Subscription = new Subscription();

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private accountsService: AccountsService,
        private userService: UserService,
        private transactionService: TransactionService) { }

    ngOnInit(): void {
        this.userSub = this.userService.getUser(this.userId).subscribe((user: UserData | any) => {
            this.allCategories = user.categories[0][this.transaction.type];
            this.allCategories.filter(category => this.selectedCategories.indexOf(category) === -1);
        });
        this.paramsSub = this.route.params.subscribe((params: Params) => {
            this.accountId = params['accountId'];
        });
        this.getAccount();
        this.setFormValues();
    }


    getAccount() {
        this.accountsSub = this.accountsService.getAccount(this.accountId).subscribe((account: IAccount[]) => {
            this.account = account[0];
        })
    }

    setFormValues(): void {
        this.addForm.controls['type'].setValue(this.transaction.type);
        this.addForm.controls['title'].setValue(this.transaction.title);
        this.addForm.controls['amount'].setValue(this.transaction.amount);
        this.addForm.controls['description'].setValue(this.transaction.description);
        this.addForm.controls['payment_date'].setValue(new Date(this.transaction.payment_date));
        this.addForm.controls['payee'].setValue(this.transaction.payee);
        this.selectedCategories = this.transaction.category;
    }

    onSubmit(): void {
        const { title, description, type, amount, payee, payment_date } = this.addForm.value;
        const finalData = {
            _id: this.transaction._id,
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
        if (this.sum === 0) {
            if (type === 'expense') {
                this.sum = this.account.amount + (this.transaction.amount - amount);
            } else {
                this.sum = this.account.amount - (this.transaction.amount - amount);
            }
        }
        this.transactionService.updateTransaction(this.accountId, finalData, type);
        this.accountsService.updateAccount({
            _id: this.accountId,
            amount: this.sum
        });
        this.sum = 0;
        this.clearForm();
        this.selectedCategories = [];
        this.drawer.close();
    }

    clearForm(): void {
        this.addForm.controls['title'].setValue('');
        this.addForm.controls['payee'].setValue('');
        this.addForm.controls['amount'].setValue('');
        this.addForm.controls['description'].setValue('');
        this.addForm.controls['payment_date'].setValue(new Date());
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

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.paramsSub.unsubscribe();
        this.accountsSub.unsubscribe();
        this.accountsChangeSub.unsubscribe();
    }
}
