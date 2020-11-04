import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../service/chat.service';
import {ActivatedRoute} from '@angular/router';
import {Chat} from '../../../model/chat';
import {Message} from '../../../model/message';
import {IdentityService} from '../../service/identity.service';
import {IonContent, IonInfiniteScroll, IonTextarea} from '@ionic/angular';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {

    @ViewChild(IonTextarea)
    ionTextAra: IonTextarea;

    chat: Chat;
    messages: Either<Message, Date>[] = [];
    viewerId: string;
    newMessageLoad = false;

    @ViewChild(IonContent)
    content: IonContent;
    @ViewChild(IonInfiniteScroll)
    ionScroll: IonInfiniteScroll;

    constructor(
        private chatService: ChatService,
        private activatedRoute: ActivatedRoute,
        private identityService: IdentityService
    ) {
        this.viewerId = identityService.getSelfId();
    }

    private static sameDate(dateMark: Date, newDate: Date) {
        return dateMark.getDate() === newDate.getDate() &&
            dateMark.getMonth() === newDate.getMonth() &&
            dateMark.getFullYear() === newDate.getFullYear();
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(value => {
            const uid = value.get('uid');
            this.chatService.queryChat(uid).subscribe(chat => {
                this.chat = chat;
                this.loadPrevious(null);
            }, () => {
            }, () => {
                this.scrollToBottom(0);
                this.newMessageLoad = true;
                this.loadNewMessages();
            });
        });
    }

    loadPrevious(event) {
        this.ionScroll.disabled = true;
        const realMessageAmount = this.messages.filter(e => e.isLeft()).length;
        // for now we are sure that messages array is either empty or has date on top
        this.chatService.queryReadChatMessages(this.chat.user.id, realMessageAmount)
            .subscribe(value => {
                this.addHistoryMessage(value);
            }, () => {
            }, () => {
                if (this.messages.filter(e => e.isLeft()).length >= 20) {
                    this.ionScroll.disabled = false;
                }
                if (event) {
                    event.target.complete();
                }
            });
    }

    addHistoryMessage(value: Message) {
        // for now we are sure that messages array is either empty or has date on top
        const topMessageView = this.messages.find(m => m.isLeft());
        const topMessage = topMessageView ? topMessageView.left : null;
        const newDate = value.createdAt;
        const shouldScrollToBottom = true;
        if (topMessage) {
            const dateMark = this.messages[0];
            if (dateMark.isRight() && ChatPage.sameDate(dateMark.right, newDate)) {
                this.messages.shift();
            }
        }
        this.messages.unshift(new Either<Message, Date>(value));
        this.messages.unshift(new Either<Message, Date>(null, newDate));
        if (shouldScrollToBottom) {
            this.content.scrollToBottom().then();
        }
    }

    addNewMessage(message: Message) {
        const topMessage = this.messages[this.messages.length - 1];
        if (!topMessage || !ChatPage.sameDate(topMessage.left.createdAt, message.createdAt)) {
            this.messages.push(
                new Either<Message, Date>(null, message.createdAt),
                new Either<Message, Date>(message)
            );
            return;
        }
        this.content.getScrollElement().then(v => {
            const shouldScroll = v.scrollHeight - v.scrollTop - v.clientHeight === 0;
            console.log(shouldScroll, v.scrollHeight, v.scrollTop, v.clientHeight);
            this.messages.push(new Either<Message, Date>(message));
            if (shouldScroll) {
                setTimeout(() => this.scrollToBottom(300), 100);
            }
        }, () => {
            this.messages.push(new Either<Message, Date>(message));
        });
    }

    sendMessage(event: MouseEvent) {
        event.stopPropagation();
        const actualMessage = this.ionTextAra.value.trim();
        if (actualMessage) {
            const msg: Message = {
                text: actualMessage,
            };
            this.chatService.sendMessage(msg, this.chat.user.id).subscribe(v => {
                v.createdAt = new Date(v.createdAt);
                this.addNewMessage(v);
            });
        }
    }

    scrollToBottom(duration: number) {
        this.content.scrollToBottom(duration).then();
    }

    ngOnDestroy(): void {
        this.newMessageLoad = false;
    }

    private loadNewMessages() {
        const reloadFun = () => {
            setTimeout(() => this.loadNewMessages(), 500);
        };
        if (this.newMessageLoad) {
            this.chatService.queryUnReadChatMessages(this.chat.user.id).subscribe(m => {
                this.addNewMessage(m);
            }, () => reloadFun(), () => reloadFun());
        }
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
