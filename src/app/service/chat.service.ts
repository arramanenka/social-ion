import {Injectable} from '@angular/core';
import {Chat} from '../../model/chat';
import {IdentityService} from './identity.service';
import {Subject} from 'rxjs';
import {Message} from '../../model/message';
import {HttpService} from './http.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(
        private identityService: IdentityService,
        private httpService: HttpService
    ) {
    }

    queryChats(action: (value: Chat[]) => void) {
        const subj = new Subject<Chat[]>();
        subj.subscribe(action);
        subj.next([
            {
                user: {
                    name: 'id',
                    id: 'id',
                    avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
                },
                lastMessageTime: new Date()
            },
            {
                user: {
                    name: 'id1',
                    id: 'id1',
                    avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
                },
                lastMessageTime: new Date()
            }
        ]);
    }

    queryChat(uid: string, action: (chat: Chat) => void) {
        const subj = new Subject<Chat>();
        subj.subscribe(action);
        subj.next(
            {
                user: {
                    name: uid,
                    id: uid,
                    avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
                },
                lastMessageTime: new Date()
            }
        );
    }

    queryReadChatMessages(
        uid: string, topMessage: Message,
        onNewMessage: (message: Message) => void,
        onFinish: () => void
    ) {
        const subj = new Subject<Message>();
        subj.subscribe(onNewMessage);
        let prevMessageDate = new Date();
        let prevMessageId = '0';
        if (topMessage) {
            prevMessageDate = new Date(topMessage.createdAt);
            prevMessageDate.setDate(prevMessageDate.getDate() - 1);
            prevMessageId = topMessage.messageId;
        }
        setTimeout(() => {
            subj.next({
                text: 'aa',
                createdAt: prevMessageDate,
                messageId: prevMessageId + '1',
                senderId: this.identityService.getSelfId()
            });
            subj.next({
                text: 'aa',
                createdAt: prevMessageDate,
                messageId: prevMessageId + '2',
                senderId: uid
            });
            onFinish();
        }, 500);
    }
}
