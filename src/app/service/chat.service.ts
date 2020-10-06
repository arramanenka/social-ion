import {Injectable} from '@angular/core';
import {Chat, ChatDTO} from '../../model/chat';
import {IdentityService} from './identity.service';
import {BehaviorSubject, empty, Observable} from 'rxjs';
import {Message} from '../../model/message';
import {HttpService} from './http.service';
import {UserService} from './user.service';
import {catchError, flatMap, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private chatserviceUrl = 'http://localhost:8081';

    constructor(
        private userService: UserService,
        private identityService: IdentityService,
        private httpService: HttpService,
        private http: HttpClient
    ) {
    }

    queryChats(): Observable<Chat> {
        return this.mapDtoToProperModel(
            this.httpService.queryJsonStream<ChatDTO>(`${this.chatserviceUrl}/chats?id=${this.identityService.getSelfId()}`)
        );
    }

    queryChat(uid: string): Observable<Chat> {
        return this.mapDtoToProperModel(
            this.http.get<ChatDTO>(`${this.chatserviceUrl}/chat/${uid}?id=${this.identityService.getSelfId()}`)
        );
    }

    mapDtoToProperModel(chatDtoObservable: Observable<ChatDTO>): Observable<Chat> {
        return chatDtoObservable.pipe(
            flatMap(e => {
                    const userObservable = this.userService.queryUser(e.interlocutorId);
                    return userObservable.pipe(
                        map(user1 => {
                            const chat: Chat = {
                                user: user1,
                                ...e
                            };
                            return chat;
                        }),
                        catchError(error => {
                            console.log(error);
                            const chat: Chat = {
                                ...e
                            };
                            return new BehaviorSubject<Chat>(chat);
                        })
                    );
                }
            ),
            catchError(err => {
                console.log(err);
                return empty();
            })
        );
    }

    queryReadChatMessages(uid: string): Observable<Message> {
        const url = `${this.chatserviceUrl}/messages/${uid}?id=${this.identityService.getSelfId()}`;
        return this.httpService.queryJsonStream<Message>(url).pipe(
            map(e => {
                e.createdAt = new Date(e.createdAt);
                return e;
            })
        );
    }
}
