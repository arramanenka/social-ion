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

    shouldShowFollow() {
        return !this.user.userMeta.blacklistedByQueryingPerson;
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
}
