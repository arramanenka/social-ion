import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../model/user';
import {IonTextarea, ModalController} from '@ionic/angular';
import {UserService} from '../../../service/user.service';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {

    @Input()
    user: User;
    @ViewChild(IonTextarea)
    textArea: IonTextarea;

    constructor(private modalController: ModalController, private userService: UserService) {
    }

    ngOnInit() {
    }

    dismiss(evt) {
        evt.stopPropagation();
        this.modalController.dismiss().then();
    }

    saveProfile(event: MouseEvent) {
        event.stopPropagation();
        let bio = this.textArea.value;
        if (bio) {
            bio = bio.trim();
            if (this.user.bio !== bio) {
                this.user.bio = bio;
                this.userService.saveProfile(this.user, u => {
                    this.user.bio = u.bio;
                    this.modalController.dismiss().then();
                });
            }
            return;
        }
        this.modalController.dismiss().then();
    }
}
