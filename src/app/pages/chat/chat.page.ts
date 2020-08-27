import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Chat} from '../../../model/chat';
import {Message} from '../../../model/message';
import {IdentityService} from '../../service/identity.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    chat: Chat;
    messages: MessageView[] = [];
    viewerId: string;

    constructor(
        private chatService: ChatService,
        private activatedRoute: ActivatedRoute,
        private identityService: IdentityService
    ) {
        this.viewerId = identityService.getSelfId();
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(value => {
            const uid = value.get('uid');
            this.chatService.queryChat(uid, chat => {
                this.chat = chat;
                this.loadPrevious();
                this.loadPrevious();
                this.loadPrevious();
                this.loadPrevious();
                this.loadPrevious();
            });
        });
    }

    loadPrevious() {
        const topMessage: Message = this.messages[0];
        this.chatService.queryReadChatMessages(this.chat.user.id, topMessage, message => {
            const messageView = {
                ...message,
                displayDate: topMessage && topMessage.createdAt > message.createdAt ? topMessage.createdAt : null
            };
            console.log(messageView);
            this.messages.unshift(messageView);
        });
    }
}

export interface MessageView extends Message {
    /**
     * additional date to be displayed after given message
     */
    displayDate: Date;
}
