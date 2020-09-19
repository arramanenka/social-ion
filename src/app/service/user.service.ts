import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User, UserMetaInf} from '../../model/user';
import {IdentityService} from './identity.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private identityService: IdentityService) {
    }

    static mockUser(uid: string, metaInf?: UserMetaInf): User {
        return {
            id: uid,
            name: uid,
            avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
            bio: 'lalalalala\nasdfasdf\nasdasd',
            followerAmount: 1000,
            followingAmount: 10000,
            userMeta: {...metaInf}
        };
    }

    querySelf(action: (value: User) => void): void {
        this.queryUser(this.identityService.getSelfId(), action);
    }

    queryUser(uid: string, action: (value: User) => void): void {
        const queriedUser: Subject<User> = new Subject<User>();
        queriedUser.subscribe(action);
        // mock for now instead of sending http request
        queriedUser.next(UserService.mockUser(uid));
    }

    queryConnectedUsers(ownerId: string, connectionType: string, forEach: (u: User) => void) {
        const metaInf: UserMetaInf = {
            isFollowed: connectionType === 'following',
            isBlacklisted: connectionType === 'blacklist'
        };
        forEach(UserService.mockUser(ownerId + '1', metaInf));
        forEach(UserService.mockUser(ownerId + '2', metaInf));
    }

    followUser(onSuccess: () => void) {
        onSuccess();
    }

    unfollowUser(onSuccess: () => void) {
        onSuccess();
    }

    unblock(user: User) {
        user.userMeta.isBlacklisted = false;
    }
}
