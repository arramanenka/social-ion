import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {IdentityService} from './identity.service';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUser: User;
    private userviceHost = 'http://localhost:8080';

    constructor(
        private identityService: IdentityService,
        private http: HttpClient
    ) {
    }

    querySelf(action: (value: User) => void, forceReload?: boolean): void {
        if (!forceReload && this.currentUser) {
            action(this.currentUser);
            return;
        }
        this.queryUser(this.identityService.getSelfId(), (u) => {
            this.currentUser = u;
            action(u);
        });
    }

    queryUser(uid: string, action: (value: User) => void, onNotFound?: () => void): void {
        this.http.get<User>(`${this.userviceHost}/user/${uid}?id=${this.identityService.getSelfId()}`)
            .subscribe(n => {
                setTimeout(() => {
                    action(n);
                }, 500);
            }, error => {
                if (error.status === 404 && onNotFound) {
                    onNotFound();
                    return;
                }
                console.log(error);
            });
    }

    queryConnectedUsers(ownerId: string, connectionType: string): Observable<User> {
        let url = `${this.userviceHost}/connections/`;
        if (connectionType === 'blacklist') {
            url += connectionType;
        } else {
            url += `${ownerId}/${connectionType}`;
        }
        url = `${url}?id=${this.identityService.getSelfId()}`;
        return this.queryJsonStream(url);
    }

    followUser(user: User): Subject<boolean> {
        const result = new Subject<boolean>();
        this.http.post<void>(`${this.userviceHost}/connections/follower/${user.id}?id=${this.identityService.getSelfId()}`, null)
            .subscribe(() => result.next(true), e => {
                result.error(e);
            });
        return result;
    }

    unfollowUser(user: User): Subject<boolean> {
        const result = new Subject<boolean>();
        this.http.delete<void>(`${this.userviceHost}/connections/follower/${user.id}?id=${this.identityService.getSelfId()}`)
            .subscribe(() => result.next(true), e => result.error(e));
        return result;
    }

    block(user: User): Subject<boolean> {
        const result = new Subject<boolean>();
        this.http.post<void>(`${this.userviceHost}/connections/blacklist/${user.id}?id=${this.identityService.getSelfId()}`, null)
            .subscribe(() => result.next(true), e => result.error(e));
        return result;
    }

    unblock(user: User): Subject<boolean> {
        const result = new Subject<boolean>();
        this.http.delete<void>(`${this.userviceHost}/connections/blacklist/${user.id}?id=${this.identityService.getSelfId()}`)
            .subscribe(() => result.next(true), e => result.error(e));
        return result;
    }

    saveProfile(user: User, onChange?: (user: User) => void) {
        this.http.post<User>(`${this.userviceHost}/user?id=${this.identityService.getSelfId()}`, user)
            .subscribe(onChange);
    }

    findAllByNicknameStart(nicknameStart: string): Observable<User> {
        return this.queryJsonStream(`${this.userviceHost}/users/nickname/${nicknameStart}?id=${this.identityService.getSelfId()}`);
    }

    queryJsonStream<R>(url: string): Observable<R> {
        return new Observable(observer => {
            const eventSource = new EventSource(url);
            eventSource.onmessage = e => {
                observer.next(JSON.parse(e.data));
            };
            eventSource.onerror = er => {
                if (eventSource.readyState !== eventSource.CONNECTING) {
                    observer.error(er);
                }
                eventSource.close();
                observer.complete();
            };
            return () => {
                eventSource.close();
            };
        });

    }
}
