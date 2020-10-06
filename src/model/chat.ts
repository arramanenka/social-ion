import {User} from './user';

export interface Chat {
    user?: User;
    lastMessageTime: Date;
    unreadCount?: number;
    lastMessageText?: string;
}

export interface ChatDTO {
    ownerId: string;
    interlocutorId: string;
    lastMessageTime: Date;
    unreadCount: number;
    lastMessageText: string;
}
