import {User} from './user';

export interface Chat {
    interlocutorId?: string;
    user?: User;
    lastMessage?: Date;
    unreadCount?: number;
    lastMessageText?: string;
}

export interface ChatDTO {
    ownerId?: string;
    interlocutorId: string;
    lastMessage?: Date;
    unreadCount?: number;
    lastMessageText?: string;
}

export interface ChatsMetaInf {
    chatCount?: number;
    unreadAmount?: number;
}
