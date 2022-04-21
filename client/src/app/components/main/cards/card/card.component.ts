import { IAccount } from '../../../../shared/interfaces/account';
import { AccountsService } from '../../../../services/accounts.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
    @Input() card!: IAccount;
    @Input() cards!: IAccount[];
    @Input() activated!: string;

    constructor(private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {

    }

    onCardClick(drawer: MatDrawer): void {
        if (this.router.isActive('/home/' + this.card._id, true)) {
            drawer.toggle();
        }
        this.router.navigate(['../', this.card._id], { relativeTo: this.route });
    }
}
