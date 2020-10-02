import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/user';
import {IdentityService} from '../../service/identity.service';

@Component({
    selector: 'app-connection-list',
    templateUrl: './connection-list.page.html',
})
export class ConnectionListPage implements OnInit {

    ownerId: string;
    connectionType: string;
    connectedUsers: User[] = [];

    constructor(
        private identityService: IdentityService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(value => {
            this.connectionType = value.get('type');
            this.ownerId = value.get('uid');
        });
        this.userService.queryConnectedUsers(this.ownerId, this.connectionType).subscribe(u => {
            if (u.id === this.identityService.getSelfId()) {
                this.connectedUsers.unshift(u);
                return;
            }
            this.connectedUsers.push(u);
        });
    }

}
