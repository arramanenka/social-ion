import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../service/user.service';
import {AlertController} from '@ionic/angular';
import {IdentityService} from '../../service/identity.service';

@Component({
    selector: 'app-user-miniature',
    templateUrl: './user-miniature.component.html',
})
export class UserMiniatureComponent implements OnInit {

    @Input()
    user: User;
    @Input()
    blacklistMiniature = false;

    isOwnMiniature = false;

    constructor(
        private identityService: IdentityService,
        private userService: UserService,
        private alertController: AlertController
    ) {
    }

    ngOnInit() {
        if (this.user.id === this.identityService.getSelfId()) {
            this.isOwnMiniature = true;
        }
    }

    follow(event: Event) {
        event.stopPropagation();
        this.userService.followUser(this.user).subscribe(r => {
            if (r) {
                this.user.userMeta.followedByQueryingPerson = true;
            }
        });
    }

    unfollow(event: Event) {
        event.stopPropagation();
        this.userService.unfollowUser(this.user).subscribe(r => {
            if (r) {
                this.user.userMeta.followedByQueryingPerson = false;
            }
        });
    }

    showUnblockDialog(event: Event) {
        event.stopPropagation();
        this.alertController.create({
            message: `Are you sure you want to unblock ${this.user.name} ?`,
            buttons: ['Cancel',
                {
                    text: 'Yes',
                    handler: () => {
                        this.userService.unblock(this.user).subscribe(r => {
                            if (r) {
                                this.user.userMeta.blacklistedByQueryingPerson = false;
                            }
                        });
                    }
                }
            ]
        }).then(res => res.present());
    }

    showBlockDialog(event: MouseEvent) {
        event.stopPropagation();
        this.alertController.create({
            message: `Are you sure you want to block ${this.user.name} ?`,
            buttons: ['Cancel',
                {
                    text: 'Yes',
                    handler: () => {
                        this.userService.block(this.user).subscribe(r => {
                                if (r) {
                                    this.user.userMeta.followingQueryingPerson = false;
                                    this.user.userMeta.followedByQueryingPerson = false;
                                    this.user.userMeta.blacklistedByQueryingPerson = true;
                                }
                            }
                        );
                    }
                }
            ]
        }).then(res => res.present());
    }
}
