import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {UserRecommendation} from '../../../../model/user';

@Component({
    selector: 'app-user-recommendations',
    templateUrl: './user-recommendations.component.html',
    styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {

    users: UserRecommendation[] = [];
    slidesOpts = {
        slidesPerView: 3,
        spaceBetween: 2,
        centerInsufficientSlides: true
    };

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.queryRecommendations().subscribe(
            e => {
                this.users.unshift(e);
            }
        );
    }

}
