import {Component, NgZone, OnInit} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {Chat} from '../../../model/chat';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.page.html',
})
export class InboxPage implements OnInit {

    chats: Chat[] = [];

    constructor(
        private chatService: ChatService,
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        this.chatService.queryChats().subscribe(chat => {
            this.chats.push(chat);
        });
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }
}
