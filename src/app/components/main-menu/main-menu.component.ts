import {Component, OnInit} from '@angular/core';
import {Platform, ViewDidEnter, ViewDidLeave} from '@ionic/angular';
import {ChatService} from '../../service/chat.service';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
})
export class MainMenuComponent implements OnInit, ViewDidEnter, ViewDidLeave {

    tabPlacement: string;
    updateNotificationLoop = false;
    unreadAmount = 0;

    constructor(
        private platform: Platform,
        private chatService: ChatService
    ) {
        if (platform.is('desktop')) {
            this.tabPlacement = 'top';
        } else {
            this.tabPlacement = 'bottom';
        }
    }

    ngOnInit() {
        this.updateNotificationLoop = true;
        this.loadNotifications();
    }

    loadNotifications(): void {
        const reload = () => setTimeout(update, 5000);
        const update = () => {
            if (this.updateNotificationLoop) {
                this.chatService.queryChatMeta()
                    .subscribe(meta => {
                        this.unreadAmount = meta.unreadAmount;
                    }, reload, reload);
            }
        };
        update();
    }

    ionViewDidEnter(): void {
        this.updateNotificationLoop = true;
    }

    ionViewDidLeave(): void {
        this.updateNotificationLoop = false;
    }
}
