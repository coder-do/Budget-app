import { IFAQ } from '../../shared/interfaces/faq';
import { FaqService } from './../../services/faq.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit, OnDestroy {
    faqs: IFAQ[] = [];
    loading: boolean = false;
    faqSub: Subscription = new Subscription();

    constructor(private faqService: FaqService) { }

    ngOnInit(): void {
        this.loading = true;
        this.faqSub = this.faqService.getFaqs().subscribe((faqs: IFAQ[]) => {
            this.loading = false;
            this.faqs = faqs;
        });
    }

    ngOnDestroy(): void {
        this.faqSub.unsubscribe();
    }
}
