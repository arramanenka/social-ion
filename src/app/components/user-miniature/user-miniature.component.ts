import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../service/user.service';

@Component({
    selector: 'app-user-miniature',
    templateUrl: './user-miniature.component.html',
    styleUrls: ['./user-miniature.component.scss'],
})
export class UserMiniatureComponent implements OnInit {

    @Input()
    user: User;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    follow() {
        this.userService.followUser(
            () => {
                this.user.userMeta.isFollowed = true;
            }
        );
    }

    unfollow() {
        this.userService.unfollowUser(
            () => {
                this.user.userMeta.isFollowed = false;
            }
        );
    }
}
