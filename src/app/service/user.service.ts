import {Injectable} from '@angular/core';
import {User, UserRecommendation} from '../../model/user';
import {IdentityService} from './identity.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpService} from './http.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private currentUser: User;
    private userviceHost = 'http://localhost:8080';

    constructor(
        private identityService: IdentityService,
        private httpService: HttpService,
        private http: HttpClient
    ) {
    }

    querySelf(forceReload?: boolean): Observable<User> {
        if (!forceReload && this.currentUser && this.currentUser.id === this.identityService.getSelfId()) {
            return new BehaviorSubject<User>(this.currentUser).asObservable();
        }
        const userObservable = this.queryUser(this.identityService.getSelfId());
        userObservable.subscribe(u => this.currentUser = u);
        return userObservable;
    }

    queryUser(uid: string): Observable<User> {
        return this.http.get<User>(`${this.userviceHost}/user/${uid}?id=${this.identityService.getSelfId()}`);
    }

    queryConnectedUsers(ownerId: string, connectionType: string): Observable<User> {
        let url = `${this.userviceHost}/connections/`;
        if (connectionType === 'blacklist') {
            url += connectionType;
        } else {
            url += `${ownerId}/${connectionType}`;
        }
        url = `${url}?id=${this.identityService.getSelfId()}`;
        return this.httpService.queryJsonStream(url);
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
        return this.httpService.queryJsonStream(`${this.userviceHost}/users/nickname/${nicknameStart}?id=${this.identityService.getSelfId()}`);
    }

    queryRecommendations(): Observable<UserRecommendation> {
        return this.httpService.queryJsonStream(`${this.userviceHost}/users/recommendations?id=${this.identityService.getSelfId()}`);
    }
}
