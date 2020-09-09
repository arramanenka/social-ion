import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/user';

@Component({
    selector: 'app-connection-list',
    templateUrl: './connection-list.page.html',
    styleUrls: ['./connection-list.page.scss'],
})
export class ConnectionListPage implements OnInit {

    private ownerId: string;
    connectionType: string;
    connectedUsers: User[] = [];

    constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(value => {
            this.connectionType = value.get('type');
            this.ownerId = value.get('uid');
        });
        this.userService.queryConnectedUsers(this.ownerId, this.connectionType, u => {
            this.connectedUsers.push(u);
        });
    }

}
