import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.scss'],
})
export class ProfileEditComponent implements OnInit {

    @Input()
    user: User;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    dismiss(evt) {
        evt.stopPropagation();
        this.modalController.dismiss().then();
    }
}
