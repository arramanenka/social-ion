import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {UserService} from '../../../service/user.service';

@Component({
    selector: 'app-profile-head',
    templateUrl: './profile-head.component.html',
    styleUrls: ['./profile-head.component.scss'],
})
export class ProfileHeadComponent implements OnInit {

    @Input() user: User;
    @Input() isOwnProfile: boolean;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    unfollow(event: MouseEvent) {
        event.stopPropagation();
        this.userService.unfollowUser(this.user).subscribe(r => {
            if (r) {
                this.user.userMeta.followedByQueryingPerson = false;
            }
        });
    }

    follow(event: MouseEvent) {
        event.stopPropagation();
        this.userService.followUser(this.user).subscribe(r => {
            if (r) {
                this.user.userMeta.followedByQueryingPerson = true;
            }
        });
    }
}
