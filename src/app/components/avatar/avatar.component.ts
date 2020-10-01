import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
})
export class AvatarComponent implements OnInit {

    @Input() avatarUrl: string;

    constructor() {
    }

    ngOnInit() {
    }

}
