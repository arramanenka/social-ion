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

    ngOnDestroy(): void {
        this.shouldUpdateChats = false;
    }


}
