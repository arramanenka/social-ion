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
            if (this.user.name === this.ionicForm.value.name) {
                this.nameEditable = false;
                return;
            }
            this.user.name = this.ionicForm.value.name;
            this.userService.saveProfile(this.user, _ => {
                this.userService.querySelf(us => this.user = us, true);
                this.nameEditable = false;
            });
        }
    }

    logout() {
        this.identityService.logout();
    }

    toggleDarkMode(event) {
        const darkModeEnabled = event.detail.checked;
        document.body.setAttribute('data-theme', darkModeEnabled ? 'dark' : 'light');
    }

    queryDarkModeEnabled() {
        const dataTheme = document.body.getAttribute('data-theme');
        if (dataTheme === 'dark') {
            return true;
        } else if (dataTheme === 'light') {
            return false;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}
