import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdentityService} from '../../service/identity.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
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
        this.userService.querySelf().subscribe(u => {
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
                this.userService.querySelf(true).subscribe(us => this.user = us);
                this.nameEditable = false;
            });
        }
    }

    logout() {
        this.identityService.logout();
    }

    pickTheme(event) {
        const value = event.detail.value;
        switch (value) {
            case 'system':
                localStorage.removeItem('data-theme');
                // change default theme accordingly
                const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (darkTheme) {
                    document.body.setAttribute('data-theme', 'dark');
                } else {
                    document.body.setAttribute('data-theme', 'light');
                }
                break;
            default:
                localStorage.setItem('data-theme', value);
                document.body.setAttribute('data-theme', value);
                break;
        }
    }

    queryCurrentTheme() {
        const theme = localStorage.getItem('data-theme');
        if (theme) {
            return theme;
        } else {
            return 'system';
        }
    }
}
