import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    constructor() {
    }

    getSelfId() {
        return 'self';
    }

    isOwnProfile(uid: string) {
        return this.getSelfId() === uid;
    }
}
