import {Injectable} from '@angular/core';
import {Chat} from '../../model/Chat';
import {IdentityService} from './identity.service';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(
        private identityService: IdentityService
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
}
