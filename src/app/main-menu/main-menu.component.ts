import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/user';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

    user: User;
    tabPlacement: string;

    constructor(
        private userService: UserService,
        private platform: Platform
    ) {
        if (platform.is('desktop')) {
            this.tabPlacement = 'top';
        } else {
            this.tabPlacement = 'bottom';
        }
    }

    ngOnInit() {
        this.userService.querySelf(user => {
            this.user = user;
        });
    }

}
