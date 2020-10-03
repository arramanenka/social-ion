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
            this.userService.querySelf().subscribe(user => {
                this.user = user;
                this.isOwnProfile = true;
            });
        });
    }

    reloadProfile(event) {
        if (this.isOwnProfile) {
            this.userService.querySelf(true).subscribe(user => {
                this.user = user;
                event.target.complete();
            });
            return;
        }
        this.queryUser(this.user.id, event);
    }

    private queryUser(uid: string, event?) {
        this.userService.queryUser(uid)
            .subscribe(user => {
                this.user = user;
                this.isOwnProfile = this.identityService.isOwnProfile(uid);
                if (event) {
                    event.target.complete();
                }
            }, error => {
                if (event) {
                    event.target.complete();
                }
                if (error.status === 404) {
                    this.userNotFound = true;
                    return;
                }
                console.log(error);
            });
    }
}
