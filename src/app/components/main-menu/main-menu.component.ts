import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

    tabPlacement: string;

    constructor(
        private platform: Platform
    ) {
        if (platform.is('desktop')) {
            this.tabPlacement = 'top';
        } else {
            this.tabPlacement = 'bottom';
        }
    }

    ngOnInit() {
    }

}
