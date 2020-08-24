import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    queriedUser: Subject<User> = new Subject<User>();

    constructor() {
    }

    queryUser(uid: string) {
        // mock for now instead of sending http request

        this.queriedUser.next(
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
