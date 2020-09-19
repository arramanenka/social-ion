import {Component, OnInit} from '@angular/core';
import {IdentityService} from '../../service/identity.service';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/user';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    user: User;
    nameEditable = false;

    constructor(
        private identityService: IdentityService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.querySelf(u => {
            this.user = u;
        });
    }

    updateName(form) {
    }
}
