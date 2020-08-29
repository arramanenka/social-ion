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
    messages: Either<Message, Date>[] = [];
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
                setTimeout(() => this.loadPrevious(), 1000);
                setTimeout(() => this.loadPrevious(), 1000);
                setTimeout(() => this.loadPrevious(), 1000);
                // setTimeout(() => this.loadPrevious(), 1000);
                // setTimeout(() => this.loadPrevious(), 1000);
                // setTimeout(() => this.loadPrevious(), 1000);
                // setTimeout(() => this.loadPrevious(), 6000);
                // setTimeout(() => this.loadPrevious(), 9000);
                // setTimeout(() => this.loadPrevious(), 12000);
                // setTimeout(() => this.loadPrevious(), 15000);
                // setTimeout(() => this.loadPrevious(), 18000);
            });
        });
    }

    loadPrevious() {
        // for now we are sure that messages array is either empty or has date on top
        const topMessageView = this.messages.find(m => m.isLeft());
        const topMessage = topMessageView ? topMessageView.left : null;
        this.chatService.queryReadChatMessages(this.chat.user.id, topMessage, value => this.appendMessage(value));
    }

    appendMessage(value: Message) {
        // for now we are sure that messages array is either empty or has date on top
        const topMessageView = this.messages.find(m => m.isLeft());
        const topMessage = topMessageView ? topMessageView.left : null;
        const newDate = value.createdAt;
        if (topMessage) {
            const dateMark = this.messages[0];
            if (dateMark.isRight()) {
                if (
                    dateMark.right.getDate() === newDate.getDate() &&
                    dateMark.right.getMonth() === newDate.getMonth() &&
                    dateMark.right.getFullYear() === newDate.getFullYear()
                ) {
                    this.messages.shift();
                }
            }
        }
        this.messages.unshift(new Either<Message, Date>(value));
        this.messages.unshift(new Either<Message, Date>(null, newDate));
    }
}

export class Either<T, K> {
    left?: T;
    right?: K;

    constructor(left?: T, right?: K) {
        this.left = left;
        this.right = right;
    }

    isLeft = () => !!this.left;
    isRight = () => !!this.right;
}
