import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
    @Input() card: any;
    // @Input() cardClickHandler: Function = () => { };

    constructor(private router: Router) { }

    ngOnInit(): void {

    }

    onCardClick() {
        this.router.navigate(['/home', this.card._id]);
    }
}
