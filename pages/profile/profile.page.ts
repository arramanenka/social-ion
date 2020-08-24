import {Component, OnInit} from '@angular/core';
import {User} from '../../src/model/user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    user: User;

    constructor() {
    }

    ngOnInit() {
        this.user = {
            id: '1',
            name: 'sasha',
            avatarUrl: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
            bio: 'lalalalala\nasdfasdf\nasdasd',
            followerAmount: 1000,
            followingAmount: 10000
        };
    }

}
