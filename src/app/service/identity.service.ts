import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    private selfId = 'self';

    constructor() {
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
}
