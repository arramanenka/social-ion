import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../service/user.service';
import {IonSearchbar} from '@ionic/angular';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
})
export class SearchPage implements OnInit {
    foundUsers: User[];
    @ViewChild(IonSearchbar)
    searchBar: IonSearchbar;

    constructor(private userService: UserService) {
    }

    ngOnInit() {

    }

    search() {
        this.foundUsers = [];
        if (this.searchBar.value) {
            this.userService.findAllByNicknameStart(this.searchBar.value).subscribe(value => {
                this.foundUsers.push(value);
            });
        }
    }
}
