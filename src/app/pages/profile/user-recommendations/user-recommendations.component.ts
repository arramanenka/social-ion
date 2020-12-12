import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {UserRecommendation} from '../../../../model/user';

@Component({
    selector: 'app-user-recommendations',
    templateUrl: './user-recommendations.component.html',
    styleUrls: ['./user-recommendations.component.scss'],
})
export class UserRecommendationsComponent implements OnInit {

    @Input()
    excludedIds: string[] = [];
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
                if (!this.excludedIds.find(id => e.user.id === id)) {
                    this.users.unshift(e);
                }
            }
        );
    }

}
