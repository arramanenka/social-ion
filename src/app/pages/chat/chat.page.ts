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
    messages: Message[] = [];
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
            });
        });
    }

    loadPrevious() {
        this.chatService.queryReadChatMessages(this.chat.user.id, this.messages[0], message => {
            this.messages.unshift(message);
        });
    }
}
