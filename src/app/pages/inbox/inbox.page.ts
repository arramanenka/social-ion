import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {Chat} from '../../../model/Chat';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.page.html',
    styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

    chats: Chat[];

    constructor(
        private chatService: ChatService
    ) {
    }

    ngOnInit() {
        this.chatService.queryChats(value => {
            this.chats = value;
        });
    }

}
