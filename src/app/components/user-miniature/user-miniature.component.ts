import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/user';

@Component({
    selector: 'app-user-miniature',
    templateUrl: './user-miniature.component.html',
    styleUrls: ['./user-miniature.component.scss'],
})
export class UserMiniatureComponent implements OnInit {

    @Input()
    user: User;

    constructor() {
    }

    ngOnInit() {
    }

}
