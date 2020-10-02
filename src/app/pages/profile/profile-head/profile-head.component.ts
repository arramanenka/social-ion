import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {UserService} from '../../../service/user.service';
import {ActionSheetController} from '@ionic/angular';
import {ActionSheetButton} from '@ionic/core/dist/types/components/action-sheet/action-sheet-interface';

@Component({
    selector: 'app-profile-head',
    templateUrl: './profile-head.component.html',
})
export class ProfileHeadComponent implements OnInit {

    @Input() user: User;
    @Input() isOwnProfile: boolean;

    constructor(private userService: UserService, private actionSheetController: ActionSheetController) {
    }

    ngOnInit() {
    }

    showPopoverForConnections(event: MouseEvent) {
        event.stopPropagation();
        const buttonsToShow: ActionSheetButton[] = [];
        const userMeta = this.user.userMeta;
        if (userMeta.followedByQueryingPerson) {
            buttonsToShow.push({
                text: 'Unfollow',
                handler: () => {
                    this.userService.unfollowUser(this.user).subscribe(r => {
                        if (r) {
                            this.user.userMeta.followedByQueryingPerson = false;
                        }
                    });
                }
            });
        } else {
            buttonsToShow.push({
                text: 'Follow',
                handler: () => {
                    this.userService.followUser(this.user).subscribe(r => {
                        if (r) {
                            this.user.userMeta.followedByQueryingPerson = true;
                        }
                    });
                }
            });
        }
        this.actionSheetController.create({
            buttons: buttonsToShow
        }).then(actionSheet => actionSheet.present());
    }

    getConnectionType() {
        if (this.user.userMeta.followedByQueryingPerson && this.user.userMeta.followingQueryingPerson) {
            return 'Friend';
        } else if (this.user.userMeta.followedByQueryingPerson) {
            return 'Following';
        } else {
            return 'Follow';
        }
    }
}
