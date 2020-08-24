import {User} from './user';

export interface Chat {
    user: User;
    lastMessageTime: Date;
}
