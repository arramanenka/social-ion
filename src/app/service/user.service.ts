import {Injectable} from '@angular/core';
import {User, UserMetaInf} from '../../model/user';
import {IdentityService} from './identity.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private identityService: IdentityService,
        private http: HttpClient
    ) {
    }

    static mockUser(uid: string, metaInf?: UserMetaInf): User {
        return {
            id: uid,
            name: uid,
            avatar: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
            bio: 'lalalalala\nasdfasdf\nasdasd',
            followersAmount: 1000,
            followingAmount: 10000,
            userMeta: {...metaInf}
        };
    }

    querySelf(action: (value: User) => void): void {
        this.queryUser(this.identityService.getSelfId(), action);
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
            isFollowed: connectionType === 'following',
            isBlacklisted: connectionType === 'blacklist'
        };
        forEach(UserService.mockUser(ownerId + '1', metaInf));
        forEach(UserService.mockUser(ownerId + '2', metaInf));
    }

    followUser(user: User) {
        user.userMeta.isFollowed = true;
    }

    unfollowUser(user: User) {
        user.userMeta.isFollowed = false;
    }

    unblock(user: User) {
        user.userMeta.isBlacklisted = false;
    }

    changeName(name: string) {
        // since for now I did not connect to proper service & login provider, id == name
        this.identityService.setId(name);
    }

    findAllByNicknameStart(nicknameStart: string, forEach: (value: User) => void) {
        forEach(UserService.mockUser(nicknameStart + '1'));
        forEach(UserService.mockUser(nicknameStart + '2'));
    }
}
