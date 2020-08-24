import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../model/user';

@Component({
    selector: 'app-profile-head',
    templateUrl: './profile-head.component.html',
    styleUrls: ['./profile-head.component.scss'],
})
export class ProfileHeadComponent implements OnInit {

    @Input() user: User;

    constructor() {
    }

    ngOnInit() {
    }

}
