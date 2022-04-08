import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit, OnDestroy {
    message = '';
    timeOut: any;
    notificationSub: Subscription = new Subscription();

    constructor(private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.notificationSub = this.notificationService.notification.subscribe((message: string) => {
            this.message = message;
            this.timeOut = setTimeout(() => {
                this.onClose();
            }, 5000);
        })
    }

    onClose(): void {
        this.message = '';
    }

    ngOnDestroy(): void {
        this.notificationSub.unsubscribe();
        clearTimeout(this.timeOut);
    }
}
