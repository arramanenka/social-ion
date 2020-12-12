import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../model/user';
import {IonInput, IonTextarea, ModalController} from '@ionic/angular';
import {UserService} from '../../../service/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../../service/storage.service';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {

    @Input()
    user: User;
    @ViewChild(IonTextarea)
    textArea: IonTextarea;
    @ViewChild(IonInput)
    avatarInput: IonInput;
    ionicForm: FormGroup;
    imageFile;
    avatarChanged: boolean;

    constructor(
        private modalController: ModalController,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private storageService: StorageService
    ) {
        this.ionicForm = formBuilder.group({
            file: ['', [Validators.required]]
        });
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
            if (this.user.bio !== bio || this.avatarChanged) {
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

    uploadPicture(event: MouseEvent) {
        event.stopPropagation();
        const imagePath = this.storageService.uploadImage(this.imageFile);
        imagePath.subscribe(value => {
            this.user.avatarUrl = `http://${value.resourceLink}`;
            this.avatarChanged = true;
        });
    }

    onImagePicked(event: Event) {
        this.imageFile = event.detail.target.files[0];
    }
}
