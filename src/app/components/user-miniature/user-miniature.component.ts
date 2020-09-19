import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../service/user.service';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-user-miniature',
    templateUrl: './user-miniature.component.html',
    styleUrls: ['./user-miniature.component.scss'],
})
export class UserMiniatureComponent implements OnInit {

    @Input()
    user: User;

    constructor(
        private userService: UserService,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
    }

    follow(event: Event) {
        event.stopPropagation();
        this.userService.followUser(
            () => {
                this.user.userMeta.isFollowed = true;
            }
        );
    }

    unfollow(event: Event) {
        event.stopPropagation();
        this.userService.unfollowUser(
            () => {
                this.user.userMeta.isFollowed = false;
            }
        );
    }

    shouldShowFollow() {
        return !this.user.userMeta.isBlacklisted;
    }

    showUnblockDialog(event: Event) {
        event.stopPropagation();
        this.alertController.create({
            message: `Are you sure you want to unblock ${this.user.name} ?`,
            buttons: ['Cancel',
                {
                    text: 'Yes',
                    handler: () => {
                        this.userService.unblock(this.user);
                    }
                }
            ]
        }).then(res => res.present());
    }
}
