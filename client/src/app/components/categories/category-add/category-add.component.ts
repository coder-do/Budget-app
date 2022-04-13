import { CategoriesService } from 'src/app/services/categories.service';
import { UserService } from './../../../services/user.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/shared/interfaces/categories';

@Component({
    selector: 'app-category-add',
    templateUrl: './category-add.component.html',
    styleUrls: ['./category-add.component.sass']
})
export class CategoryAddComponent implements OnInit, OnDestroy {
    @Input() drawer!: MatDrawer;
    allCategories!: any;
    selectedCategories!: string[];
    addForm: FormGroup = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        type: ['expense', [Validators.required]],
    });
    isDuplicate: boolean = false;
    userId: string = localStorage.getItem('userId') as string;
    userSub: Subscription = new Subscription();
    titleSub: Subscription = new Subscription();
    categoriesSub: Subscription = new Subscription();

    constructor(private _snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private categoriesService: CategoriesService) { }

    ngOnInit(): void {
        this.getAllCategories();
        this.categoriesService.categoriesChanged.subscribe(() => {
            this.getAllCategories();
        })
        this.titleSub = this.addForm.controls['title'].valueChanges.subscribe((title: string) => {
            this.checkForDuplicate(title, this.addForm.controls['type'].value);
        })
    }

    getAllCategories(): void {
        this.userSub = this.userService.getUser(this.userId).subscribe(user => {
            this.allCategories = user.categories;
        });
    }

    checkForDuplicate(title: string, type: string): void {
        if (this.allCategories[0][type].find(
            (category: string) => category.toLowerCase() === title.toLowerCase())) {
            this.isDuplicate = true;
        } else {
            this.isDuplicate = false;
        }
    }

    openSnackBar(text: string): void {
        this._snackBar.open(text, 'Close', {
            duration: 5000
        })
    }

    onSubmit(): void {
        const { title, type } = this.addForm.value;
        this.checkForDuplicate(title, type);
        if (!this.isDuplicate) {
            this.allCategories[0][type].push(title);
            this.userService.updateUser(this.userId, { categories: this.allCategories });
            this.openSnackBar('Category was successfully added!');
            this.clearForm();
            this.drawer.close();
        }
    }

    clearForm(): void {
        this.addForm.controls['title'].setValue('');
        this.addForm.controls['type'].setValue('expense');
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
        this.titleSub.unsubscribe();
        this.categoriesSub.unsubscribe();
    }
}
