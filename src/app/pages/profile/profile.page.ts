import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {IdentityService} from '../../identity.service';
import {UserService} from '../../user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: User;

    constructor(
        private identityService: IdentityService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.userService.queriedUser.subscribe(user => {
            this.user = user;
        });
        this.activatedRoute.paramMap.subscribe(value => {
            console.log(value);
            let uid = value.get('uid');
            if (!uid) {
                uid = this.identityService.getSelfId();
            }
            console.log(uid);
            this.userService.queryUser(uid);
        });
    }

}
