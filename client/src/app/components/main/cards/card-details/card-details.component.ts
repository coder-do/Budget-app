import { IAccount } from 'src/app/shared/interfaces/account';
import { MatDrawer } from '@angular/material/sidenav';
import { Component, OnInit, Input } from '@angular/core';
import { AccountModalComponent } from '../../modals/account-modal/account-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.sass']
})
export class CardDetailsComponent implements OnInit {
    @Input() cards!: IAccount[];
    @Input() drawer!: MatDrawer;
    @Input() account!: IAccount;

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {

    }

    onEdit(drawer: MatDrawer): void {
        drawer.toggle();
    }

    openDialog() {
        this.dialog.open(AccountModalComponent, {
            width: '625px',
            height: '238px',
            data: {
                accountId: this.account._id,
                drawer: this.drawer,
                cards: this.cards
            }
        });
    }

    onDelete(): void {
        this.openDialog();
    }
}
