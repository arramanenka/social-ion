import {Injectable} from '@angular/core';
import {User, UserMetaInf} from '../../model/user';
import {IdentityService} from './identity.service';
import {HttpClient} from '@angular/common/http';

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

    static mockUser(uid: string, metaInf?: UserMetaInf): User {
        return {
            id: uid,
            name: uid,
            avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
            bio: 'lalalalala\nasdfasdf\nasdasd',
            followersAmount: 1000,
            followingAmount: 10000,
            userMeta: {...metaInf}
        };
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

    queryConnectedUsers(ownerId: string, connectionType: string, forEach: (u: User) => void) {
        let url = `${this.userviceHost}/connections/`;
        if (connectionType === 'blacklist') {
            url += connectionType;
        } else {
            url += `${ownerId}/${connectionType}`;
        }
        url = `${url}?id=${this.identityService.getSelfId()}`;
        this.queryJsonStream(url, (data) => {
            const user: User = JSON.parse(data);
            forEach(user);
        });
    }

    followUser(user: User) {
        user.userMeta.isFollowedByQueryingPerson = true;
    }

    unfollowUser(user: User) {
        user.userMeta.isFollowedByQueryingPerson = false;
    }

    unblock(user: User) {
        user.userMeta.isBlacklistedByQueryingPerson = false;
    }

    saveProfile(user: User, onChange?: (user: User) => void) {
        this.http.post<User>(`${this.userviceHost}/user?id=${this.identityService.getSelfId()}`, user)
            .subscribe(onChange);
    }

    findAllByNicknameStart(nicknameStart: string, forEach: (value: User) => void) {
        this.queryJsonStream(`${this.userviceHost}/users/nickname/${nicknameStart}?id=${this.identityService.getSelfId()}`, data => {
            const user: User = JSON.parse(data);
            forEach(user);
        });
    }

    queryJsonStream(url: string, onData: (data: string) => void) {
        const eventSource = new EventSource(url);
        let startedOnce = false;
        eventSource.onopen = () => {
            if (startedOnce) {
                eventSource.close();
            }
            startedOnce = true;
        };
        eventSource.onmessage = e => {
            onData(e.data);
        };
        eventSource.onerror = er => {
            console.log(er);
        };
    }
}
