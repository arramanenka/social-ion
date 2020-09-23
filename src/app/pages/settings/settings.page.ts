import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdentityService} from '../../service/identity.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    user: User;
    nameEditable = false;
    ionicForm: FormGroup;

    constructor(
        private identityService: IdentityService,
        private userService: UserService,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.userService.querySelf(u => {
            this.user = u;
            this.ionicForm = this.formBuilder.group({
                name: [this.user.name, [Validators.required, Validators.minLength(1)]]
            });
        });
    }

    updateName() {
        if (this.ionicForm.valid) {
            this.user.name = this.ionicForm.value.name;
            this.user.avatarUrl = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
            this.userService.saveProfile(this.user, _ => {
                this.userService.querySelf(us => this.user = us, true);
                this.nameEditable = false;
            });
        }
    }

    logout() {
        this.identityService.logout();
    }
}
