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
            this.chatService.queryChats().subscribe(chat => {
                this.ngZone.run(() => {
                    const index = this.chats.findIndex((_chat, _index, _chats) => _chat.user.id === chat.user.id);
                    if (index < 0) {
                        this.chats.unshift(chat);
                        return;
                    }
                    const storedChat = this.chats[index];
                    storedChat.user.bio = chat.user.bio;
                    storedChat.user.avatarUrl = chat.user.avatarUrl;
                    storedChat.user.name = chat.user.name;
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
