import { UserService } from 'src/app/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

type MatDialogData = {
    temp: any,
    id: string,
    item: string,
    type: 'income' | 'expense',
    openSnackBar: (text: string) => void
};

@Component({
    selector: 'app-category-delete',
    templateUrl: './category-delete.component.html',
    styleUrls: ['./category-delete.component.sass']
})
export class CategoryDeleteComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
        private userService: UserService,
        private dialogRef: MatDialogRef<CategoryDeleteComponent>) { }

    ngOnInit(): void { }

    onDelete(): void {
        const { id, temp, item, openSnackBar, type } = this.data;
        if (temp.income.includes(item) && type === 'income') {
            temp.income.splice(temp.income.indexOf(item), 1);
        } if (temp.expense.includes(item) && type === 'expense') {
            temp.expense.splice(temp.expense.indexOf(item), 1);
        }
        this.userService.updateUser(id, { categories: temp });
        openSnackBar(`Category ${item} was successfully removed!`);
        this.dialogRef.close();
    }
}
