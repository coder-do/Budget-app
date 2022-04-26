import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { IAccount } from 'src/app/shared/interfaces/account';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDeleteComponent } from '../../main/modals/category-delete/category-delete.component';
import { ITransaction } from '../../../shared/interfaces/account';
import { ICategory } from 'src/app/shared/interfaces/categories';

@Component({
    selector: 'app-category-item',
    templateUrl: './category-item.component.html',
    styleUrls: ['./category-item.component.sass']
})
export class CategoryItemComponent implements OnInit, OnDestroy {
    @ViewChild('changed') inp!: ElementRef<HTMLDivElement>;
    @Input() drawer!: MatDrawer;
    @Input() allAccounts!: Array<IAccount>;
    @Input() categories!: ICategory;
    @Input() item!: string;
    @Input() type!: string;
    temp: any;
    allAcounts: any[] = [];
    allCategories: any[] = [];
    isEditable: boolean = false;
    userId: string = localStorage.getItem('userId') as string;
    timeoutSub!: ReturnType<typeof setTimeout>;
    userSub: Subscription = new Subscription();
    accountsSub: Subscription = new Subscription();
    categoriesSub: Subscription = new Subscription();
    categoriesChangeSub: Subscription = new Subscription();

    constructor(private _snackBar: MatSnackBar,
        public dialog: MatDialog,
        private userService: UserService,
        private transactionService: TransactionService,
        private categoriesService: CategoriesService,
        private accountsService: AccountsService) { }

    ngOnInit(): void {
        this.accountsService.getAccounts();
        this.updateAccounts();
        this.categoriesChangeSub = this.categoriesService.categoriesChanged.subscribe(() => {
            this.accountsService.getAccounts();
            this.updateAccounts();
        })
    }

    updateAccounts(): void {
        this.accountsSub = this.accountsService.accounts.subscribe((accounts: IAccount[]) => {
            if (this.allCategories.length === 0) {
                accounts.map((account: IAccount) => {
                    this.allCategories.push(account.transactions.income);
                    this.allCategories.push(account.transactions.expense);
                })
                this.allCategories = this.allCategories.flat();
                this.getAllCategories();
            }
            this.temp = Object.assign({}, this.categories);
        });
    }

    getAllCategories(): void {
        let temp: string[] = [];
        this.allCategories.map((c: ITransaction) => {
            temp.push(...c.category);
        })
        this.allCategories = temp;
    }

    onEdit(): void {
        this.isEditable = true;
        this.inp.nativeElement.textContent = this.item;
        this.timeoutSub = setTimeout(() => {
            this.inp.nativeElement.focus();
        }, 0);
    }

    onDelete(): void {
        if (this.allCategories.includes(this.item)) {
            this.openSnackBar('This category can’t be removed because it contains information about your expenses!');
            return;
        } else {
            this.openDialog();
        }
    }

    onSave(): void {
        this.isEditable = false;
        if (this.item.toLowerCase() !== this.inp.nativeElement.textContent!.toLowerCase().trim()) {
            if (this.inp.nativeElement.textContent?.match(/[$&+,:/;=?@#|'<>.^*()%!-]/)) {
                this.openSnackBar('Category name can only contain letters and numbers!');
                this.onClear();
                return;
            }
            if (this.inp.nativeElement.textContent?.trim() === '') {
                this.openSnackBar('Category name can not be empty!');
                this.onClear();
                return;
            }
            this.temp.income.map((inc: string, ind: number) => {
                if (inc.toLowerCase() === this.item.toLowerCase()) {
                    this.updateTransactionCategories(this.item, 'income', this.inp.nativeElement.textContent!.trim());
                    this.temp.income[ind] = this.inp.nativeElement.textContent;
                }
            })
            this.temp.expense.map((exp: string, ind: number) => {
                if (exp.toLowerCase() === this.item.toLowerCase()) {
                    this.updateTransactionCategories(this.item, 'expense', this.inp.nativeElement.textContent!.trim());
                    this.temp.expense[ind] = this.inp.nativeElement.textContent;
                }
            });
            this.userService.updateUser(this.userId, { categories: this.temp });
            this.openSnackBar('Category has been updated!');
            this.onClear();
        } else {
            this.openSnackBar('Category already exists, update rejected!');
            this.onClear();
            return;
        }
    }

    updateTransactionCategories(item: string, type: string, newItem: string): void {
        this.allAccounts.map((account: IAccount) => {
            (account.transactions as any)[type].map((transaction: ITransaction) => {
                if (transaction.category.includes(item)) {
                    transaction.category.map((category: string, ind: number) => {
                        if (category === item) {
                            transaction.category[ind] = newItem;
                            this.transactionService.updateTransaction(account._id, transaction, type);
                        }
                    })
                }
            })
        })
    }

    openDialog() {
        this.dialog.open(CategoryDeleteComponent, {
            width: '620px',
            height: '238px',
            data: {
                id: this.userId,
                temp: this.temp,
                type: this.type,
                item: this.item,
                openSnackBar: this.openSnackBar.bind(this),
            },
        });
    }

    openSnackBar(text: string): void {
        this._snackBar.open(text, 'Close', {
            duration: 5000
        })
    }

    onClear(): void {
        this.isEditable = false;
        this.inp.nativeElement.textContent = this.item.split(' ')[0];
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.accountsSub.unsubscribe();
        this.categoriesSub.unsubscribe();
        this.categoriesChangeSub.unsubscribe();
        clearTimeout(this.timeoutSub);
    }
}
