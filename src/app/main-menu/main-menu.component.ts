import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/user';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

    user: User;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userService.querySelf(user => {
            this.user = user;
        });
    }

}
