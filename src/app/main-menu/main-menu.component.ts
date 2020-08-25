import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../../model/user';
import {MenuController} from '@ionic/angular';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

    @Input()
    contentId: string;
    user: User;

    constructor(private userService: UserService, private menuController: MenuController) {
    }

    ngOnInit() {
        this.userService.querySelf(user => {
            this.user = user;
        });
    }

    closeMenu() {
        this.menuController.close().then();
    }

}
