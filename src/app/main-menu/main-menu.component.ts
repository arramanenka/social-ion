import {Component, Input, OnInit} from '@angular/core';
import {IdentityService} from '../identity.service';
import {UserService} from '../user.service';
import {User} from '../../model/user';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

    @Input()
    contentId: string;
    user: User;

    constructor(private identityService: IdentityService, private userService: UserService) {
    }

    ngOnInit() {
        const selfId = this.identityService.getSelfId();
        this.userService.queryUser(selfId, user => {
            this.user = user;
        });
    }

}
