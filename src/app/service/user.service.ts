import {Injectable} from '@angular/core';
import {User, UserMetaInf} from '../../model/user';
import {IdentityService} from './identity.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUser: User;

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
        this.http.get<User>(`http://localhost:8080/user/${uid}?id=${this.identityService.getSelfId()}`)
            .subscribe(n => {
                console.log(n);
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
        const metaInf: UserMetaInf = {
            isFollowedByQueryingPerson: connectionType === 'following',
            isBlacklistedByQueryingPerson: connectionType === 'blacklist'
        };
        forEach(UserService.mockUser(ownerId + '1', metaInf));
        forEach(UserService.mockUser(ownerId + '2', metaInf));
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
        this.http.post<User>(`http://localhost:8080/user?id=${this.identityService.getSelfId()}`, user)
            .subscribe(onChange);
    }

    findAllByNicknameStart(nicknameStart: string, forEach: (value: User) => void) {
        forEach(UserService.mockUser(nicknameStart + '1'));
        forEach(UserService.mockUser(nicknameStart + '2'));
    }
}
