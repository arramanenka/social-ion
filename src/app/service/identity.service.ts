import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    private selfId = 'aa';

    constructor(private router: Router) {
    }

    getSelfId() {
        return this.selfId;
    }

    isOwnProfile(uid: string) {
        return this.getSelfId() === uid;
    }

    setId(name: string) {
        this.selfId = name;
    }

    logout() {
        this.selfId = null;
        this.router.navigateByUrl('login').then();
    }
}
