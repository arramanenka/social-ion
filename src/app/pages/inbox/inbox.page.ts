import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {Chat} from '../../../model/chat';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.page.html',
})
export class InboxPage implements OnInit, OnDestroy {

    chats: Chat[] = [];
    shouldUpdateChats;

    constructor(
        private chatService: ChatService,
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        this.shouldUpdateChats = true;
        this.loadChats();
    }

    loadChats() {
        if (this.shouldUpdateChats) {
            const newChats: Chat[] = [];
            this.chatService.queryChats().subscribe(chat => {
                newChats.push(chat);
            }, () => {
            }, () => {
                this.ngZone.run(() => {
                    newChats.sort((a, b) => a.lastMessage < b.lastMessage ? 1 : -1);
                    this.chats.unshift(...newChats);
                    const duplicate = new Set();
                    let i = 0;
                    this.chats.forEach(c => {
                        if (duplicate.has(c.user.id)) {
                            this.chats.splice(i, i + 1);
                            return;
                        }
                        duplicate.add(c.user.id);
                        i++;
                    });
                });
                setTimeout(() => {
                    this.loadChats();
                }, 10000);
            });
        }
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    ngOnDestroy(): void {
        this.shouldUpdateChats = false;
    }


}
