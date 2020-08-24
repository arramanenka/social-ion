import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../../model/user';
import {IdentityService} from './identity.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private identityService: IdentityService) {
    }

    querySelf(action: (value: User) => void): void {
        this.queryUser(this.identityService.getSelfId(), action);
    }

    queryUser(uid: string, action: (value: User) => void): void {
        const queriedUser: Subject<User> = new Subject<User>();
        queriedUser.subscribe(action);
        // mock for now instead of sending http request
        queriedUser.next(
            {
                id: uid,
                name: uid,
                avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
                bio: 'lalalalala\nasdfasdf\nasdasd',
                followerAmount: 1000,
                followingAmount: 10000
            }
        );
    }
}
