import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private router: Router
    ) {
    }

    navigateToProfile(event: MouseEvent, user: User) {
        event.stopPropagation();
        this.router.navigateByUrl('/profile/' + user.id).then();
    }

    navigateToFollowers(event: MouseEvent, user: User) {
        event.stopPropagation();
        this.router.navigateByUrl(`/connection-list/${user.id}/followers`).then();
    }

    navigateToFollowings(event: MouseEvent, user: User) {
        event.stopPropagation();
        this.router.navigateByUrl(`/connection-list/${user.id}/following`).then();
    }
}
