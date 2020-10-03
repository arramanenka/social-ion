import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {IdentityService} from '../../service/identity.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {

    user: User;
    isOwnProfile: boolean;
    displayBackButton = true;
    userNotFound = false;

    constructor(
        private identityService: IdentityService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(value => {
            const uid = value.get('uid');
            if (uid) {
                this.queryUser(uid);
                return;
            }
            this.displayBackButton = false;
            this.userService.querySelf(user => {
                this.user = user;
                this.isOwnProfile = true;
            });
        });
    }

    reloadProfile(event) {
        if (this.isOwnProfile) {
            this.userService.querySelf(user => {
                this.user = user;
                event.target.complete();
            }, true);
            return;
        }
        this.queryUser(this.user.id, event);
    }

    private queryUser(uid: string, event?) {
        this.userService.queryUser(uid, user => {
            this.user = user;
            this.isOwnProfile = this.identityService.isOwnProfile(uid);
            if (event) {
                event.target.complete();
            }
        }, () => {
            if (event) {
                event.target.complete();
            }
            this.userNotFound = true;
        });
    }
}
