import {Component, NgZone} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {Chat} from '../../../model/chat';
import {ViewDidEnter, ViewDidLeave} from '@ionic/angular';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.page.html',
})
export class InboxPage implements ViewDidEnter, ViewDidLeave {

    chats: Chat[] = [];
    shouldUpdateChats;

    constructor(
        private chatService: ChatService,
        private ngZone: NgZone
    ) {
    }

    loadChats() {
        if (this.shouldUpdateChats) {
            const ignoredProfiles = this.chats.map(e => e.user.id);
            this.chatService.queryChats(ignoredProfiles).subscribe(chat => {
                this.ngZone.run(() => {
                    const index = this.chats.findIndex((_chat, _index, _chats) => _chat.interlocutorId === chat.interlocutorId);
                    if (index < 0) {
                        this.chats.unshift(chat);
                        return;
                    }
                    const storedChat = this.chats[index];
                    storedChat.lastMessage = chat.lastMessage;
                    storedChat.lastMessageText = chat.lastMessageText;
                    storedChat.unreadCount = chat.unreadCount;
                });

            }, () => {
            }, () => {
                this.ngZone.run(() => {
                    this.chats.sort((a, b) => a.lastMessage < b.lastMessage ? 1 : -1);
                });
                setTimeout(() => {
                    this.loadChats();
                }, 1000);
            });
        }
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    ionViewDidEnter(): void {
        this.shouldUpdateChats = true;
        this.loadChats();
    }

    ionViewDidLeave(): void {
        this.shouldUpdateChats = false;
        this.chats = [];
    }
}
