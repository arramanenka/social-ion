import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../model/user';

@Component({
    selector: 'app-connection-list',
    templateUrl: './connection-list.page.html',
    styleUrls: ['./connection-list.page.scss'],
})
export class ConnectionListPage implements OnInit {

    private connectionType: string;
    private ownerId: string;


    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(value => {
            this.connectionType = value.get('type');
        });
        this.activatedRoute.queryParams.subscribe(params => {
            this.ownerId = params.id;
        });
    }

}
