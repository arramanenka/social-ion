import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    private selfId = null;

    constructor(private router: Router) {
    }

    getSelfId() {
        if (!this.selfId) {
            this.selfId = localStorage.getItem('id');
        }
        return this.selfId;
    }

    isOwnProfile(uid: string) {
        return this.getSelfId() === uid;
    }

    setId(id: string) {
        this.selfId = id;
        localStorage.setItem('id', id);
    }

    logout() {
        localStorage.removeItem('id');
        this.selfId = null;
        this.router.navigateByUrl('login').then();
    }
}
