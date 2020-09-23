import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {IdentityService} from '../../service/identity.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
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
                this.userService.queryUser(uid, user => {
                    this.user = user;
                    this.isOwnProfile = this.identityService.isOwnProfile(uid);
                }, () => {
                    this.userNotFound = true;
                });
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
        this.userService.querySelf(user => {
            this.user = user;
            event.target.complete();
        }, true);
    }
}
